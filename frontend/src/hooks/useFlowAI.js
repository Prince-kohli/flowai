import { useState, useCallback, useRef } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import * as api from '../services/api';

const INITIAL_EDGES = [
  {
    id: 'main-edge',
    source: 'input-node',
    target: 'result-node',
    type: 'smoothstep',
    animated: false,
    style: { stroke: 'rgba(124,58,237,0.55)', strokeWidth: 2.5 },
    markerEnd: { type: 'arrowclosed', color: 'rgba(124,58,237,0.7)' },
  },
];

export function useFlowAI() {
  const promptRef = useRef('');
  const responseRef = useRef('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3200);
  };

  const onPromptChange = useCallback((val) => {
    promptRef.current = val;
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: 'input-node',
      type: 'inputNode',
      position: { x: 60, y: 160 },
      data: { onPromptChange },
    },
    {
      id: 'result-node',
      type: 'resultNode',
      position: { x: 620, y: 160 },
      data: { response: '', loading: false },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const setEdgeAnimated = useCallback(
    (animated) =>
      setEdges((eds) => eds.map((e) => ({ ...e, animated }))),
    [setEdges]
  );

  const setResultNode = useCallback(
    (patch) =>
      setNodes((nds) =>
        nds.map((n) =>
          n.type === 'resultNode' ? { ...n, data: { ...n.data, ...patch } } : n
        )
      ),
    [setNodes]
  );

  const runFlow = useCallback(async () => {
    const prompt = promptRef.current;
    if (!prompt.trim()) return notify('error', '⚠️ Please enter a prompt first!');

    setLoading(true);
    setEdgeAnimated(true);
    setResultNode({ loading: true, response: '' });
    responseRef.current = '';

    try {
      const result = await api.askAI(prompt);
      responseRef.current = result;
      setResultNode({ loading: false, response: result });
      setEdgeAnimated(false);
    } catch {
      setResultNode({ loading: false, response: '❌ Error getting AI response. Check your backend.' });
      setEdgeAnimated(false);
    } finally {
      setLoading(false);
    }
  }, [setEdgeAnimated, setResultNode]);

  const saveFlow = useCallback(async () => {
    if (!promptRef.current || !responseRef.current)
      return notify('error', '⚠️ Run the flow first before saving!');

    setSaving(true);
    try {
      await api.saveConversation(promptRef.current, responseRef.current);
      notify('success', '✓ Saved to MongoDB successfully!');
    } catch {
      notify('error', '✕ Failed to save. Is MongoDB running?');
    } finally {
      setSaving(false);
    }
  }, []);

  const clearFlow = useCallback(() => {
    promptRef.current = '';
    responseRef.current = '';
    // Recreate nodes with a new ID/key pattern to force input reset if needed, or just clear data
    setNodes([
      {
        id: `input-node-${Date.now()}`,
        type: 'inputNode',
        position: { x: 60, y: 160 },
        data: { onPromptChange },
      },
      {
        id: `result-node-${Date.now()}`,
        type: 'resultNode',
        position: { x: 620, y: 160 },
        data: { response: '', loading: false },
      },
    ]);
    // Fix edges to point to new nodes
    setEdges(eds => eds.map(e => ({ 
      ...e, 
      source: `input-node-${Date.now()}`, 
      target: `result-node-${Date.now()}` 
    })));
    notify('success', '✓ Flow cleared for new prompt!');
  }, [onPromptChange, setNodes, setEdges]);

  const loadHistory = useCallback(async () => {
    try {
      const data = await api.getHistory();
      setHistory(data);
      setHistoryOpen(true);
    } catch {
      notify('error', '✕ Could not load history.');
    }
  }, []);

  return {
    nodes, edges, onNodesChange, onEdgesChange,
    loading, saving, notification,
    history, historyOpen, setHistoryOpen,
    runFlow, saveFlow, clearFlow, loadHistory,
  };
}

import ReactFlow, { Background, Controls, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import InputNode from './components/nodes/InputNode';
import ResultNode from './components/nodes/ResultNode';
import { useFlowAI } from './hooks/useFlowAI';
import './App.css';

// Defined outside component to avoid React Flow warning #002
const nodeTypes = { inputNode: InputNode, resultNode: ResultNode };

function App() {
  const {
    nodes, edges, onNodesChange, onEdgesChange,
    loading, saving, notification,
    history, historyOpen, setHistoryOpen,
    runFlow, saveFlow, clearFlow, loadHistory,
  } = useFlowAI();

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div>
            <h1 className="brand-name">FlowAI</h1>
            <p className="brand-sub">Visual AI Workflow Builder</p>
          </div>
        </div>

        <div className="header-center">
          <div className="status-pill">
            <span className="status-dot" />
            Connected to OpenRouter
          </div>
        </div>

        <div className="header-actions">
          <button id="btn-clear" className="btn btn-ghost" onClick={clearFlow}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line>
            </svg>
            Clear Flow
          </button>
          <button id="btn-history" className="btn btn-ghost" onClick={loadHistory}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            History
          </button>
          <button id="btn-save" className="btn btn-secondary" onClick={saveFlow} disabled={saving}>
            {saving ? (
              <><span className="spinner sm" /> Saving…</>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                </svg>
                Save
              </>
            )}
          </button>
          <button id="btn-run" className="btn btn-primary" onClick={runFlow} disabled={loading}>
            {loading ? (
              <><span className="spinner sm" /> Running…</>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Run Flow
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── Notification ── */}
      {notification && (
        <div className={`notification ${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}

      {/* ── Canvas ── */}
      <div className="canvas-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          minZoom={0.4}
          maxZoom={1.8}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.06)" />
          <Controls showInteractive={false} />
        </ReactFlow>

        {/* Tip overlay */}
        <div className="canvas-tip">
          <kbd>Scroll</kbd> to zoom · <kbd>Drag</kbd> to pan · <kbd>Drag nodes</kbd> to reposition
        </div>
      </div>

      {/* ── History Panel ── */}
      {historyOpen && (
        <div className="history-overlay" onClick={() => setHistoryOpen(false)}>
          <aside className="history-panel" onClick={(e) => e.stopPropagation()}>
            <div className="history-header">
              <h2>Conversation History</h2>
              <button id="btn-close-history" className="icon-btn" onClick={() => setHistoryOpen(false)}>✕</button>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <div className="history-empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <p>No saved conversations yet.</p>
                </div>
              ) : (
                history.map((item, i) => (
                  <div key={item._id || i} className="history-item">
                    <div className="history-prompt">
                      <span className="history-label">Prompt</span>
                      <p>{item.prompt}</p>
                    </div>
                    <div className="history-response">
                      <span className="history-label">Response</span>
                      <p>{item.response}</p>
                    </div>
                    <div className="history-date">
                      {new Date(item.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './InputNode.css';

function InputNode({ data }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    data.onPromptChange(e.target.value);
  };

  return (
    <div className="flow-node input-node">
      <div className="node-header">
        <div className="node-icon input-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <span className="node-title">Prompt Input</span>
        <span className="node-badge input-badge">INPUT</span>
      </div>
      <div className="node-body">
        <textarea
          className="node-textarea"
          placeholder="Ask me anything… e.g. What is the capital of France?"
          value={value}
          onChange={handleChange}
          rows={5}
        />
        <div className="char-count">{value.length} chars</div>
      </div>
      <Handle type="source" position={Position.Right} className="node-handle input-handle" />
    </div>
  );
}

export default InputNode;

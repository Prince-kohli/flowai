import { Handle, Position } from 'reactflow';
import './ResultNode.css';

function ResultNode({ data }) {
  return (
    <div className={`flow-node result-node ${data.loading ? 'is-loading' : ''} ${data.response ? 'has-response' : ''}`}>
      <Handle type="target" position={Position.Left} className="node-handle result-handle" />
      <div className="node-header">
        <div className="node-icon result-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        </div>
        <span className="node-title">AI Response</span>
        <span className="node-badge result-badge">OUTPUT</span>
      </div>
      <div className="node-body">
        {data.loading ? (
          <div className="loading-container">
            <div className="loading-dots">
              <span /><span /><span />
            </div>
            <p className="loading-text">Thinking…</p>
          </div>
        ) : (
          <div className={`result-text ${!data.response ? 'empty' : ''}`}>
            {data.response || 'Response will appear here after you click Run Flow.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultNode;

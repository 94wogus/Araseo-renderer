import { Handle, Position } from '@xyflow/react';

/**
 * Diamond node for decision points in flowcharts
 */
export function DiamondNode({ data }) {
  return (
    <div
      style={{
        width: '140px',
        height: '140px',
        position: 'relative',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ top: '5px' }} />
      <div
        style={{
          width: '100%',
          height: '100%',
          background: data.color || '#FF9800',
          color: 'white',
          border: '2px solid rgba(0,0,0,0.2)',
          transform: 'rotate(45deg)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          fontWeight: 'bold',
          width: '80%',
          wordBreak: 'keep-all',
        }}
        title={data.description}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ bottom: '5px' }} />
      <Handle type="source" position={Position.Left} style={{ left: '5px' }} />
      <Handle type="source" position={Position.Right} style={{ right: '5px' }} />
    </div>
  );
}

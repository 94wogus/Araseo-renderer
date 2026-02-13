import { Handle, Position } from '@xyflow/react';

/**
 * Oval node for start/end points in flowcharts
 */
export function OvalNode({ data }) {
  return (
    <div
      style={{
        padding: '10px 20px',
        borderRadius: '50px',
        background: data.color || '#4CAF50',
        color: 'white',
        border: '2px solid rgba(0,0,0,0.2)',
        minWidth: '120px',
        textAlign: 'center',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
      title={data.description}
    >
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

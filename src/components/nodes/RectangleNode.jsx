import { Handle, Position } from '@xyflow/react';

/**
 * Rectangle node for process steps in flowcharts
 */
export function RectangleNode({ data }) {
  return (
    <div
      style={{
        padding: '12px 24px',
        borderRadius: '4px',
        background: data.color || '#2196F3',
        color: 'white',
        border: '2px solid rgba(0,0,0,0.2)',
        minWidth: '150px',
        textAlign: 'center',
        fontWeight: '500',
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

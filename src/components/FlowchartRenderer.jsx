import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { jgfToReactFlow } from '../adapters/jgfToReactFlow';
import { OvalNode, RectangleNode, DiamondNode } from './nodes';

// Custom node types for different flowchart shapes
const nodeTypes = {
  oval: OvalNode,
  rectangle: RectangleNode,
  diamond: DiamondNode,
};

export function FlowchartRenderer({ jgfData }) {
  const { nodes, edges } = jgfToReactFlow(jgfData);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

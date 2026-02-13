// JGF (JSON Graph Format) to React Flow adapter
export function jgfToReactFlow(jgfData) {
  if (!jgfData?.graph) {
    return { nodes: [], edges: [] };
  }

  const { nodes: nodeData, edges: edgeData } = jgfData.graph;

  // Convert nodes
  const nodes = Object.entries(nodeData || {}).map(([id, node], index) => ({
    id,
    type: getNodeType(node.metadata?.shape),
    data: {
      label: node.label,
      color: node.metadata?.color || '#2196F3',
      description: node.metadata?.description
    },
    position: {
      x: node.metadata?.x || (index % 3) * 250,
      y: node.metadata?.y || Math.floor(index / 3) * 150
    }
  }));

  // Convert edges
  const edges = (edgeData || []).map((edge, idx) => ({
    id: edge.id || `e${idx}`,
    source: edge.source,
    target: edge.target,
    label: edge.metadata?.label || edge.label,
    type: 'smoothstep',
    animated: edge.metadata?.style === 'dashed',
    style: {
      stroke: edge.metadata?.color || '#b1b1b7',
      strokeDasharray: edge.metadata?.style === 'dashed' ? '5,5' : undefined,
      strokeWidth: 2
    }
  }));

  return { nodes, edges };
}

function getNodeType(shape) {
  // Map JGF shapes to React Flow node types
  // For now, use 'default' and style with CSS
  return 'default';
}

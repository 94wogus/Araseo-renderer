export function UIMockupRenderer({ mockupData }) {
  // Placeholder for UI mockup renderer
  // TODO: Integrate Excalidraw or Rough.js
  return (
    <div style={{ padding: '20px' }}>
      <h2>UI Mockup Renderer</h2>
      <p>Mockup Title: {mockupData?.mockup?.title || mockupData?.ui?.title || 'Unknown'}</p>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
        {JSON.stringify(mockupData, null, 2)}
      </pre>
      <p><em>TODO: Implement Excalidraw/Rough.js rendering</em></p>
    </div>
  );
}

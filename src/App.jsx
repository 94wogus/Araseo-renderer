import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { jsonDataAtom, rendererTypeAtom } from './store/atoms';
import { FlowchartRenderer } from './components/FlowchartRenderer';
import { UIMockupRenderer } from './components/UIMockupRenderer';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useAtom(jsonDataAtom);
  const [rendererType] = useAtom(rendererTypeAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load demo JSON file
    // TODO: Make this configurable (file picker or URL param)
    const loadJSON = () => {
      fetch('/examples/demo-login-flow.json?' + Date.now()) // Cache bust
        .then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then(data => {
          setJsonData(data);
          setLoading(false);
          console.log('[Araseo] JSON loaded:', new Date().toISOString());
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    };

    loadJSON();

    // Vite HMR: Auto-reload when JSON files change
    if (import.meta.hot) {
      import.meta.hot.on('vite:beforeUpdate', () => {
        console.log('[Araseo] Detecting file change, reloading JSON...');
        loadJSON();
      });
    }
  }, [setJsonData]);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error Loading JSON</h2>
        <p>{error}</p>
        <p>Make sure <code>/examples/demo-login-flow.json</code> exists in public directory.</p>
      </div>
    );
  }

  if (!jsonData) {
    return <div style={{ padding: '20px' }}>No data loaded</div>;
  }

  if (rendererType === 'flowchart') {
    return <FlowchartRenderer jgfData={jsonData} />;
  }

  if (rendererType === 'ui-mockup') {
    return <UIMockupRenderer mockupData={jsonData} />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Unknown JSON Format</h2>
      <p>Could not determine renderer type from JSON data.</p>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    </div>
  );
}

export default App;

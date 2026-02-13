import { watch } from 'chokidar';

/**
 * Vite plugin to enable HMR for JSON files in public directory
 * Watches public/examples/*.json and triggers full reload on changes
 */
export function jsonHMRPlugin() {
  return {
    name: 'json-hmr',
    configureServer(server) {
      // Watch JSON files in public/examples
      const watcher = watch('public/examples/**/*.json', {
        ignoreInitial: true,
      });

      watcher.on('change', (path) => {
        console.log(`[json-hmr] Detected change in ${path}`);
        // Trigger full reload for all connected clients
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      });

      watcher.on('add', (path) => {
        console.log(`[json-hmr] Detected new file ${path}`);
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      });

      // Cleanup watcher on server close
      server.httpServer?.once('close', () => {
        watcher.close();
      });
    },
  };
}

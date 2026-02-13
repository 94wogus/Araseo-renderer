import { atom } from 'jotai';

// Current JSON data being rendered
export const jsonDataAtom = atom(null);

// Last update timestamp
export const lastUpdatedAtom = atom(Date.now());

// Renderer type: 'flowchart' | 'ui-mockup' | null
export const rendererTypeAtom = atom((get) => {
  const data = get(jsonDataAtom);
  if (!data) return null;
  if (data.graph?.type === 'flowchart') return 'flowchart';
  if (data.mockup || data.ui) return 'ui-mockup';
  return null;
});

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

/**
 * Canvas component for rendering wireframe UI mockups using Rough.js
 */
export function WireframeCanvas({ mockupData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !mockupData) return;

    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size based on device type
    const device = mockupData.mockup?.metadata?.device || 'desktop';
    const width = device === 'mobile' ? 375 : 1200;
    const height = device === 'mobile' ? 667 : 800;

    canvas.width = width;
    canvas.height = height;

    // Render layout sections
    const layout = mockupData.mockup?.layout;
    if (!layout) return;

    let yOffset = 0;

    layout.sections?.forEach((section) => {
      const sectionHeight = getSectionHeight(section.type);

      // Draw section container
      rc.rectangle(20, yOffset + 20, width - 40, sectionHeight, {
        roughness: 1,
        strokeWidth: 2,
        fill: 'rgba(240, 240, 240, 0.3)',
      });

      // Draw section label
      ctx.font = '12px monospace';
      ctx.fillStyle = '#666';
      ctx.fillText(section.type.toUpperCase(), 30, yOffset + 40);

      // Render components in section
      renderComponents(rc, ctx, section.components, 40, yOffset + 60, width - 80);

      yOffset += sectionHeight + 20;
    });
  }, [mockupData]);

  return (
    <div style={{ padding: '20px', overflow: 'auto', background: '#fafafa' }}>
      <h2>{mockupData?.mockup?.title || 'UI Mockup'}</h2>
      <canvas ref={canvasRef} style={{ border: '1px solid #ddd', background: 'white' }} />
    </div>
  );
}

function getSectionHeight(type) {
  const heights = {
    header: 100,
    main: 400,
    footer: 80,
    sidebar: 300,
    modal: 250,
  };
  return heights[type] || 200;
}

function renderComponents(rc, ctx, components, x, y, maxWidth) {
  if (!components) return;

  let currentY = y;

  components.forEach((component) => {
    switch (component.type) {
      case 'button':
        rc.rectangle(x, currentY, 120, 40, {
          roughness: 1,
          strokeWidth: 2,
          fill: 'rgba(33, 150, 243, 0.1)',
        });
        ctx.font = '14px monospace';
        ctx.fillStyle = '#333';
        ctx.fillText(component.label || 'Button', x + 10, currentY + 25);
        currentY += 60;
        break;

      case 'input':
        rc.rectangle(x, currentY, Math.min(300, maxWidth), 40, {
          roughness: 1,
          strokeWidth: 1,
          fill: 'rgba(255, 255, 255, 0.9)',
        });
        ctx.font = '12px monospace';
        ctx.fillStyle = '#999';
        ctx.fillText(component.placeholder || 'Input...', x + 10, currentY + 25);
        currentY += 60;
        break;

      case 'heading':
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#333';
        ctx.fillText(component.text || 'Heading', x, currentY + 20);
        currentY += 40;
        break;

      case 'paragraph':
        ctx.font = '14px monospace';
        ctx.fillStyle = '#666';
        const text = component.text || 'Lorem ipsum...';
        ctx.fillText(text.substring(0, 50), x, currentY + 20);
        currentY += 30;
        break;

      case 'navbar':
        rc.rectangle(x, currentY, maxWidth, 50, {
          roughness: 1,
          strokeWidth: 2,
          fill: 'rgba(76, 175, 80, 0.1)',
        });
        currentY += 70;
        break;

      default:
        // Generic component box
        rc.rectangle(x, currentY, 200, 60, {
          roughness: 1,
          strokeWidth: 1,
          fill: 'rgba(200, 200, 200, 0.1)',
        });
        ctx.font = '12px monospace';
        ctx.fillStyle = '#999';
        ctx.fillText(component.type, x + 10, currentY + 35);
        currentY += 80;
    }
  });
}

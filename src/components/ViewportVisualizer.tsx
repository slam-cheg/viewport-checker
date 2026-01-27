import React, { useEffect, useRef } from 'react';
import { ViewportData } from '../types/viewport';

interface ViewportVisualizerProps {
  viewport: ViewportData;
  history: Array<{ width: number; height: number; timestamp: number }>;
}

const ViewportVisualizer: React.FC<ViewportVisualizerProps> = ({ viewport, history }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw current viewport
    const scale = 0.1;
    const x = (canvas.width - viewport.width * scale) / 2;
    const y = (canvas.height - viewport.height * scale) / 2;

    // Draw history as faded rectangles
    history.slice(-10).forEach((entry, index) => {
      const alpha = 0.1 + (index / 10) * 0.3;
      ctx.fillStyle = `rgba(100, 149, 237, ${alpha})`;
      const histX = (canvas.width - entry.width * scale) / 2;
      const histY = (canvas.height - entry.height * scale) / 2;
      ctx.fillRect(histX, histY, entry.width * scale, entry.height * scale);
    });

    // Draw current viewport outline
    ctx.strokeStyle = '#4169E1';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, viewport.width * scale, viewport.height * scale);

    // Draw dimensions text
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${viewport.width} × ${viewport.height}`,
      canvas.width / 2,
      y + viewport.height * scale + 30
    );
  }, [viewport, history]);

  return (
    <div className="viewport-visualizer">
      <h3>Viewport Visualization</h3>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="visualization-canvas"
      />
    </div>
  );
};

export default ViewportVisualizer;
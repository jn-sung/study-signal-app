import React, { useRef, useEffect, useState } from 'react';
import { Home, Eraser, PenTool } from 'lucide-react';
import { Notebook } from '../types';

interface NoteDetailViewProps {
  notebook: Notebook;
  onBack: () => void;
}

export const NoteDetailView: React.FC<NoteDetailViewProps> = ({ notebook, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Setup Canvas Context
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      // Save current content if needed, but for now we reset on resize for simplicity 
      // or just set dimensions. To keep content, we'd need an offscreen canvas.
      // Here we just set initial size.
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Re-apply styles after resize
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2.5;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Drawing Logic
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    
    // Get coordinates
    const { x, y } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.closePath();
    setIsDrawing(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-white relative flex flex-col animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/graphy.png")' }} 
      />

      {/* Header Toolbar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 shadow-sm border border-gray-200 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"
          >
            <Home size={18} />
            <span className="text-sm font-medium">Home</span>
          </button>
        </div>

        <div className="px-6 py-2 bg-white/90 shadow-sm border border-gray-200 rounded-full backdrop-blur-sm pointer-events-auto">
           <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
             <PenTool size={14} className="text-blue-500" />
             {notebook.title}
           </h2>
        </div>

        <div className="pointer-events-auto">
          <button 
            onClick={clearCanvas}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 shadow-sm border border-gray-200 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 transition-colors"
          >
            <Eraser size={18} />
            <span className="text-sm font-medium">지우기</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <canvas
        ref={canvasRef}
        className="touch-none w-full h-full cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      
      {/* Decorative Pencil Fab (Visual only) */}
      <div className="absolute bottom-8 right-8 pointer-events-none opacity-50">
         <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-xl">
            <PenTool size={20} />
         </div>
      </div>
    </div>
  );
};

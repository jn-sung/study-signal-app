import React from 'react';
import { Notebook } from '../types';

interface NotebookItemProps {
  notebook?: Notebook;
  isNew?: boolean;
  onClick: () => void;
}

export const NotebookItem: React.FC<NotebookItemProps> = ({ notebook, isNew, onClick }) => {
  if (isNew) {
    return (
      <button
        onClick={onClick}
        className="group relative flex flex-col items-center justify-center w-32 h-40 md:w-36 md:h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 shadow-sm"
      >
        <div className="text-4xl text-gray-400 group-hover:text-blue-500 mb-2">+</div>
        <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600">새 노트</span>
      </button>
    );
  }

  if (!notebook) return null;

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col w-32 h-40 md:w-36 md:h-48 transition-transform hover:-translate-y-1 duration-200"
    >
      {/* Notebook Spine/Binding effect */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10 z-10 rounded-l-lg border-r border-black/5" />
      
      {/* Cover */}
      <div className={`w-full h-full ${notebook.coverColor} rounded-r-lg rounded-l-sm shadow-md border border-black/5 flex flex-col p-4 items-center justify-start pt-8 relative overflow-hidden`}>
        {/* Label Area */}
        <div className="bg-white/90 w-full py-3 px-2 rounded shadow-sm text-center mb-2 mt-4 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">
            {notebook.title}
          </h3>
        </div>
      </div>
    </button>
  );
};
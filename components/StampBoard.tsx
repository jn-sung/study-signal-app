import React from 'react';
import { Stamp } from '../types';
import { Check, Star } from 'lucide-react';

interface StampBoardProps {
  stamps: Stamp[];
}

export const StampBoard: React.FC<StampBoardProps> = ({ stamps }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-600 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          출석 체크
        </h3>
        <span className="text-xs text-gray-400">
          {stamps.filter(s => s.achieved).length} / 10
        </span>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            className={`
              relative flex items-center justify-center w-10 h-10 rounded-full border-2 
              ${stamp.achieved 
                ? 'border-red-400 bg-red-50' 
                : 'border-dashed border-gray-300 bg-gray-50'}
            `}
          >
            {stamp.achieved ? (
              <div className="relative">
                <div className="absolute inset-0 animate-ping opacity-20 bg-red-500 rounded-full"></div>
                <div className="border-2 border-red-500/80 rounded-full w-8 h-8 flex items-center justify-center transform -rotate-12">
                   <Check className="w-5 h-5 text-red-600/90" strokeWidth={3} />
                </div>
              </div>
            ) : (
              <span className="text-xs text-gray-300">{stamp.id}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
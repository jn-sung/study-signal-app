import React, { useState } from 'react';
import { X, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { SoundTrack, SoundType } from '../types';
import { SOUND_TRACKS } from '../constants';

interface SoundPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundPlayerModal: React.FC<SoundPlayerModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundTrack>(SOUND_TRACKS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:px-10 pointer-events-none">
      {/* Overlay for mobile click-out if needed, but here we just position the player */}
      <div className="absolute inset-0 bg-black/20 pointer-events-auto sm:bg-transparent" onClick={onClose} />
      
      <div 
        className="pointer-events-auto relative w-full sm:w-80 bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden mb-0 sm:mb-20 animate-[slideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Vinyl Decoration */}
        <div className="bg-gray-800 p-6 flex justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
          <div className={`w-40 h-40 rounded-full bg-black border-4 border-gray-700 shadow-xl flex items-center justify-center relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
             {/* Vinyl Grooves */}
             <div className="absolute inset-2 rounded-full border border-gray-800 opacity-50"></div>
             <div className="absolute inset-4 rounded-full border border-gray-800 opacity-50"></div>
             <div className="absolute inset-6 rounded-full border border-gray-800 opacity-50"></div>
             
             {/* Label */}
             <div className="w-14 h-14 bg-yellow-600 rounded-full flex items-center justify-center text-xl">
               {currentTrack.icon}
             </div>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-6">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-bold text-gray-800">{currentTrack.label}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Focus Soundscape</p>
          </div>

          <div className="flex justify-center items-center gap-6 mb-6">
            <button className="text-gray-400 hover:text-gray-600">
               <Volume2 size={20} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-transform active:scale-95"
            >
              {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <SkipForward size={20} />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 px-1">TRACK LIST</p>
            {SOUND_TRACKS.map((track) => (
              <button
                key={track.type}
                onClick={() => {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                }}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-sm ${
                  currentTrack.type === track.type 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <span className="text-lg">{track.icon}</span>
                <span className="font-medium">{track.label}</span>
                {currentTrack.type === track.type && isPlaying && (
                  <div className="ml-auto flex gap-0.5 items-end h-3">
                    <div className="w-0.5 bg-blue-500 h-full animate-pulse"></div>
                    <div className="w-0.5 bg-blue-500 h-2/3 animate-pulse delay-75"></div>
                    <div className="w-0.5 bg-blue-500 h-1/2 animate-pulse delay-150"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
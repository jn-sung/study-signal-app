import React, { useEffect, useState } from 'react';
import { X, Users, MapPin, AlertCircle } from 'lucide-react';
import { UserLocation } from '../types';

interface LightMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string | null;
}

const STUDY_MESSAGES = [
  "토익 공부중", "미적분학", "중간고사", "졸려요", 
  "코딩 테스트", "자격증", "수능 대박", "빡공", 
  "잠깐 휴식", "달리는 중", "밤샘각", "파이팅"
];

export const LightMapModal: React.FC<LightMapModalProps> = ({ isOpen, onClose, apiKey }) => {
  const [users, setUsers] = useState<UserLocation[]>([]);

  // Simulate fetching active users
  useEffect(() => {
    // Safety Guard: Do not attempt to load/fetch if not open or NO API Key
    if (!isOpen || !apiKey) return;

    // 1. Generate base users with safer random coordinates
    const mockUsers: UserLocation[] = Array.from({ length: 20 }, (_, i) => ({
      id: `user-${i}`,
      x: Math.random() * 80 + 10, // Keep somewhat central (10-90%)
      y: Math.random() * 80 + 10, // Keep somewhat central (10-90%)
      isActive: Math.random() > 0.2,
    }));

    // 2. Select 5-6 random indices to show messages
    const indices = Array.from({ length: 20 }, (_, i) => i);
    // Shuffle indices
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    const messageCount = 5 + Math.floor(Math.random() * 2); // 5 or 6
    const selectedIndices = indices.slice(0, messageCount);

    // 3. Assign messages
    selectedIndices.forEach(index => {
      mockUsers[index].message = STUDY_MESSAGES[Math.floor(Math.random() * STUDY_MESSAGES.length)];
    });

    setUsers(mockUsers);
  }, [isOpen, apiKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl h-[80vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <MapPin className="text-yellow-400" />
              Study Signal Map
            </h2>
            <p className="text-gray-400 text-sm">
              {apiKey 
                ? `지금 ${users.length + 1}명의 친구들이 각자의 책상에서 불을 밝히고 있어요.` 
                : 'API 키가 필요합니다.'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="pointer-events-auto p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Map Visualization */}
        <div className="w-full h-full relative bg-gradient-to-b from-gray-900 via-slate-900 to-black flex items-center justify-center">
          {/* Grid lines (decorative) */}
          <div className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'linear-gradient(#4f4f4f 1px, transparent 1px), linear-gradient(90deg, #4f4f4f 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />

          {/* Fallback if No API Key */}
          {!apiKey ? (
             <div className="z-20 text-center p-6 bg-gray-800/80 rounded-xl border border-gray-700 backdrop-blur-md">
                <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">API 연결 필요</h3>
                <p className="text-gray-400 mb-4">함께 공부하는 친구들을 보려면<br/>메인 화면에서 API 키를 설정해주세요.</p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  돌아가서 설정하기
                </button>
             </div>
          ) : (
            <>
              {/* User Lights */}
              {users.map((user) => (
                <div
                  key={user.id}
                  className="absolute"
                  style={{ top: `${user.y}%`, left: `${user.x}%` }}
                >
                  <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-yellow-400/30 rounded-full blur-xl animate-pulse-slow"></div>
                    {/* Core Light */}
                    <div className="w-3 h-3 bg-yellow-100 rounded-full shadow-[0_0_10px_2px_rgba(255,255,0,0.6)]"></div>
                    
                    {/* Speech Bubble (Conditional) */}
                    {user.message && (
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap animate-[bounce_3s_infinite]">
                        <div className="relative bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
                          <p className="text-[11px] font-bold text-gray-800 leading-none">
                            {user.message}
                          </p>
                          {/* Triangle Tail */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/90"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* My Location (Center-ish) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <div className="absolute -inset-8 bg-blue-500/20 rounded-full blur-2xl"></div>
                      <div className="w-4 h-4 bg-blue-400 rounded-full border-2 border-white shadow-[0_0_20px_5px_rgba(59,130,246,0.5)] animate-pulse"></div>
                    </div>
                    <span className="text-xs text-blue-300 font-medium px-2 py-1 bg-black/40 rounded-full backdrop-blur-md">나 (공부 중)</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Stats */}
        {apiKey && (
          <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white/80 z-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-md">
                <Users size={16} />
                <span className="text-sm">현재 전국 접속자 1,248명</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
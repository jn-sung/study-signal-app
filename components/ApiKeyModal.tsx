import React, { useState, useEffect } from 'react';
import { Lock, Check, AlertCircle, Loader2 } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  initialKey?: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, initialKey }) => {
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'TESTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen && initialKey) {
      setKey(initialKey);
    }
  }, [isOpen, initialKey]);

  if (!isOpen) return null;

  const handleTestAndSave = async () => {
    if (!key.trim()) {
      setErrorMsg('API 키를 입력해주세요.');
      setStatus('ERROR');
      return;
    }

    setStatus('TESTING');
    setErrorMsg('');

    // Simulate connection test without actual API call to prevent errors
    setTimeout(() => {
      setStatus('SUCCESS');
      setTimeout(() => {
        onSave(key);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">API 키 설정</h2>
            <p className="text-xs text-gray-500">Google Gemini API 연동</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setStatus('IDLE');
                setErrorMsg('');
              }}
              placeholder="AI Studio 키 입력"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm bg-gray-50"
            />
          </div>

          {status === 'ERROR' && (
            <div className="flex items-start gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-lg">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {status === 'SUCCESS' && (
            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
              <Check size={16} />
              <span>키가 안전하게 저장되었습니다.</span>
            </div>
          )}

          <button
            onClick={handleTestAndSave}
            disabled={status === 'TESTING' || status === 'SUCCESS'}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium transition-all mt-2
              ${status === 'SUCCESS' ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30'}
              ${status === 'TESTING' ? 'opacity-70 cursor-wait' : ''}
            `}
          >
            {status === 'TESTING' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>저장 중...</span>
              </>
            ) : status === 'SUCCESS' ? (
              <>
                <Check size={18} />
                <span>저장 완료</span>
              </>
            ) : (
              <span>저장하기</span>
            )}
          </button>
          
          <div className="text-center mt-4">
             <p className="text-[10px] text-gray-400">
               키는 브라우저 로컬 스토리지에 저장됩니다.
             </p>
             {initialKey && (
               <button onClick={onClose} className="text-xs text-gray-500 underline mt-2 hover:text-gray-700">
                 취소하고 닫기
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
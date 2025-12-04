import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, Eye, EyeOff, X, Lock } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  existingKey: string | null;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, existingKey }) => {
  const [inputValue, setInputValue] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (isOpen && existingKey) {
      setInputValue(existingKey);
    }
  }, [isOpen, existingKey]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSave(inputValue.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 opacity-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Key className="w-5 h-5 text-yellow-400" />
              API Key 설정
            </h2>
            <p className="text-slate-400 text-sm mt-1">Google Gemini를 연결합니다.</p>
          </div>
          {existingKey && (
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google GenAI API Key
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type={showKey ? "text" : "password"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-12 transition-all bg-gray-50 focus:bg-white"
                  placeholder="AIzaSy..."
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                키는 브라우저(Local Storage)에 안전하게 저장됩니다.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                <ExternalLink size={16} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-blue-900">API 키가 없으신가요?</h4>
                <p className="text-xs text-blue-700 mt-1 mb-2 leading-relaxed">
                  Google AI Studio에서 무료로 키를 발급받을 수 있습니다.
                </p>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-600 text-white px-3 py-2 rounded-lg inline-flex items-center gap-1 hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow"
                >
                  키 발급받기 <ExternalLink size={10} />
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex justify-center items-center gap-2"
            >
              확인 및 저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
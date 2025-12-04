import React, { useState } from 'react';
import { 
  FileText, 
  Share2, 
  Map as MapIcon, 
  Disc, 
  Plus,
  BookOpen,
  FolderOpen
} from 'lucide-react';
import { INITIAL_NOTEBOOKS, INITIAL_STAMPS } from './constants';
import { ModalType, Notebook } from './types';
import { NotebookItem } from './components/NotebookItem';
import { StampBoard } from './components/StampBoard';
import { LightMapModal } from './components/LightMapModal';
import { SoundPlayerModal } from './components/SoundPlayerModal';
import { NoteDetailView } from './components/NoteDetailView';

function App() {
  const [activeModal, setActiveModal] = useState<ModalType>('NONE');
  const [activeTab, setActiveTab] = useState<'MY' | 'SHARED'>('MY');
  const [selectedNotebookId, setSelectedNotebookId] = useState<string | null>(null);
  const [notebooks, setNotebooks] = useState<Notebook[]>(INITIAL_NOTEBOOKS);
  const [stamps] = useState(INITIAL_STAMPS);

  const handleCreateNotebook = () => {
    // Simple mock creation
    const newNote: Notebook = {
      id: Date.now().toString(),
      title: '새로운 과목',
      coverColor: 'bg-green-200',
      lastEdited: new Date().toISOString().split('T')[0]
    };
    setNotebooks([...notebooks, newNote]);
  };

  const selectedNotebook = notebooks.find(n => n.id === selectedNotebookId);

  return (
    <div className="min-h-screen bg-[#e2e8f0] p-4 md:p-8 font-sans flex items-center justify-center">
      {/* Main Container (Container 1) */}
      <div className="w-full max-w-6xl h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-300 relative transition-all duration-500">
        
        {selectedNotebookId && selectedNotebook ? (
          <NoteDetailView 
            notebook={selectedNotebook} 
            onBack={() => setSelectedNotebookId(null)} 
          />
        ) : (
          <>
            {/* Sidebar (Container 2) */}
            <aside className="w-full md:w-64 bg-slate-50 border-r border-gray-200 flex flex-col p-6 z-10">
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="text-primary" />
                  Study Signal
                </h1>
                <p className="text-xs text-gray-500 mt-2">오늘도 당신의 불빛을 밝혀주세요.</p>
              </div>

              <nav className="flex-1 space-y-4">
                <button 
                  onClick={() => setActiveTab('MY')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                    activeTab === 'MY' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <FileText size={20} />
                  <span>나의 문서</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('SHARED')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                    activeTab === 'SHARED' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Share2 size={20} />
                  <span>공유 문서</span>
                </button>
              </nav>

              <div className="mt-auto pt-6 border-t border-gray-200">
                 <div className="bg-blue-50 p-4 rounded-xl">
                   <p className="text-xs font-medium text-blue-800 mb-1">오늘의 명언</p>
                   <p className="text-xs text-blue-600 leading-relaxed">
                     "가장 어두운 밤에, 가장 밝은 별이 뜹니다."
                   </p>
                 </div>
              </div>
            </aside>

            {/* Main Content (Container 3) */}
            <main className="flex-1 bg-white relative flex flex-col overflow-hidden">
              
              {/* Top Bar with Stamp Board */}
              <div className="h-24 p-6 flex justify-end items-start absolute top-0 right-0 left-0 z-10 pointer-events-none">
                <div className="pointer-events-auto">
                  <StampBoard stamps={stamps} />
                </div>
              </div>

              {/* Notebook Grid Area */}
              <div className="flex-1 overflow-y-auto p-8 pt-32">
                {activeTab === 'MY' ? (
                  <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
                    <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-2 border-gray-100">
                      최근 학습 노트
                    </h2>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center sm:justify-items-start">
                      {notebooks.map((notebook) => (
                        <NotebookItem 
                          key={notebook.id} 
                          notebook={notebook} 
                          onClick={() => setSelectedNotebookId(notebook.id)} 
                        />
                      ))}
                      
                      <NotebookItem 
                        isNew 
                        onClick={handleCreateNotebook} 
                      />
                    </div>

                    {notebooks.length === 0 && (
                      <div className="text-center py-20 text-gray-400">
                        <p>아직 노트가 없습니다. 첫 노트를 만들어보세요!</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full pb-20 animate-in fade-in duration-300">
                    <div className="bg-gray-50 p-6 rounded-full mb-4">
                      <FolderOpen size={48} className="text-gray-300" strokeWidth={1.5} />
                    </div>
                    <p className="text-gray-400 font-medium">아직 공유된 문서가 없습니다.</p>
                  </div>
                )}
              </div>

              {/* Floating Actions (Bottom) */}
              <div className="absolute bottom-6 left-6 z-20">
                 <button 
                   onClick={() => setActiveModal('MAP')}
                   className="group flex items-center justify-center w-14 h-14 bg-gray-800 text-yellow-400 rounded-2xl shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1 transition-all duration-300"
                   title="불빛 지도 보기"
                 >
                   <MapIcon size={24} className="group-hover:animate-pulse" />
                   <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                     N
                   </span>
                 </button>
                 <span className="absolute left-16 top-4 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                   함께하는 친구들 보기
                 </span>
              </div>

              <div className="absolute bottom-6 right-6 z-20">
                 <button 
                   onClick={() => setActiveModal('SOUND')}
                   className="group flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-primary to-blue-400 text-white rounded-full shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300 animate-[spin_10s_linear_infinite_paused] hover:animate-running"
                   style={{ animationPlayState: activeModal === 'SOUND' ? 'running' : 'paused' }}
                   title="ASMR 플레이어"
                 >
                   <Disc size={32} />
                 </button>
              </div>
            </main>
          </>
        )}
      </div>

      {/* Modals */}
      <LightMapModal 
        isOpen={activeModal === 'MAP'} 
        onClose={() => setActiveModal('NONE')} 
      />
      
      <SoundPlayerModal 
        isOpen={activeModal === 'SOUND'} 
        onClose={() => setActiveModal('NONE')} 
      />
    </div>
  );
}

export default App;

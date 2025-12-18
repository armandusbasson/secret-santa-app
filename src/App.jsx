import React, { useState } from 'react';
import { Gift, RefreshCw, Eye, EyeOff, Plus, Trash2, Moon, Sun, Sparkles } from 'lucide-react';

const SecretSantaGenerator = () => {
  const [names, setNames] = useState(['', '']);
  const [assignments, setAssignments] = useState(null);
  const [revealedNames, setRevealedNames] = useState(new Set());
  const [confetti, setConfetti] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');

  const generateConfetti = () => {
    const pieces = [];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 1,
        color: ['#ef4444', '#22c55e', '#3b82f6', '#fbbf24', '#a855f7'][Math.floor(Math.random() * 5)]
      });
    }
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3000);
  };

  const addNameField = () => {
    setNames([...names, '']);
  };

  const removeNameField = (index) => {
    if (names.length > 2) {
      const newNames = names.filter((_, i) => i !== index);
      setNames(newNames);
    }
  };

  const updateName = (index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
    setError('');
  };

  const generateAssignments = () => {
    const validNames = names.filter(name => name.trim() !== '');
    
    if (validNames.length < 2) {
      setError('Please enter at least 2 names!');
      return;
    }

    generateConfetti();
    
    let validAssignment = false;
    let result = {};
    let attempts = 0;
    const maxAttempts = 1000;

    while (!validAssignment && attempts < maxAttempts) {
      attempts++;
      result = {};
      
      const givers = [...validNames];
      const receivers = [...validNames].sort(() => Math.random() - 0.5);
      
      validAssignment = true;
      for (let i = 0; i < givers.length; i++) {
        const giver = givers[i];
        const receiver = receivers[i];
        
        if (giver === receiver) {
          validAssignment = false;
          break;
        }
        
        result[giver] = receiver;
      }
    }

    if (validAssignment) {
      setAssignments(result);
      setRevealedNames(new Set());
      setError('');
    } else {
      setError('Could not generate valid assignments. Please try again!');
    }
  };

  const toggleReveal = (name) => {
    const newRevealed = new Set(revealedNames);
    if (newRevealed.has(name)) {
      newRevealed.delete(name);
    } else {
      newRevealed.add(name);
    }
    setRevealedNames(newRevealed);
  };

  const resetAll = () => {
    setNames(['', '']);
    setAssignments(null);
    setRevealedNames(new Set());
    setError('');
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 relative overflow-hidden transition-colors ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-red-50 via-white to-green-50'
    }`}>
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full animate-fall pointer-events-none"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`
          }}
        />
      ))}
      
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className={`rounded-2xl shadow-2xl p-8 ${
          darkMode ? 'bg-slate-900/90 border border-slate-800' : 'bg-white/90 backdrop-blur border border-slate-200'
        }`}>
          {/* Header with Dark Mode Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Gift className="w-10 h-10 text-red-600" />
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Secret Santa
              </h1>
              <Gift className="w-10 h-10 text-green-600" />
            </div>
            <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              🎄 Making spirits bright with surprise gift exchanges! 🎅
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Main Content */}
          {!assignments ? (
            <div className="space-y-6">
              {/* Name Input Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Enter Participant Names
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {names.map((name, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => updateName(index, e.target.value)}
                        placeholder={`Person ${index + 1}`}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          darkMode 
                            ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                            : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      />
                      {names.length > 2 && (
                        <button
                          onClick={() => removeNameField(index)}
                          className="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={addNameField}
                  className={`w-full py-3 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    darkMode 
                      ? 'border-slate-700 text-slate-300 hover:border-green-500 hover:text-green-400 hover:bg-slate-800' 
                      : 'border-slate-300 text-slate-600 hover:border-green-500 hover:text-green-600 hover:bg-slate-50'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Another Person
                </button>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateAssignments}
                className="w-full bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Generate Secret Santa Assignments
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Assignments Section */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  🎁 Assignments (click to reveal)
                </h3>
                
                <div className="space-y-3">
                  {Object.entries(assignments).map(([giver, receiver]) => (
                    <div
                      key={giver}
                      onClick={() => toggleReveal(giver)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                        darkMode 
                          ? 'bg-slate-800 border-slate-700 hover:border-red-500' 
                          : 'bg-gradient-to-r from-red-50 to-green-50 border-slate-200 hover:border-red-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {giver}
                          </span>
                          <span className={`mx-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            gives to
                          </span>
                          {revealedNames.has(giver) ? (
                            <span className="font-semibold text-green-600">
                              {receiver}
                            </span>
                          ) : (
                            <span className={`italic ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                              Click to reveal
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleReveal(giver);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'hover:bg-slate-700' : 'hover:bg-white'
                          }`}
                        >
                          {revealedNames.has(giver) ? (
                            <EyeOff className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                          ) : (
                            <Eye className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={generateAssignments}
                  className="flex-1 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Regenerate
                </button>
                <button
                  onClick={resetAll}
                  className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800' 
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`text-center mt-6 text-sm ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
          <p>© 2025 TechStudio (PTY) Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SecretSantaGenerator;

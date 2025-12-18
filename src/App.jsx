import React, { useState } from 'react';
import { Gift, RefreshCw, Eye, EyeOff, Plus, Trash2, Moon, Sun } from 'lucide-react';

const SecretSantaGenerator = () => {
  const [names, setNames] = useState(['', '']);
  const [assignments, setAssignments] = useState(null);
  const [revealedNames, setRevealedNames] = useState(new Set());
  const [confetti, setConfetti] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

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
  };

  const generateAssignments = () => {
    const validNames = names.filter(name => name.trim() !== '');
    
    if (validNames.length < 2) {
      alert('Please enter at least 2 names!');
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
    } else {
      alert('Could not generate valid assignments. Please try again!');
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
  };

  return (
    <div className={`min-h-screen p-8 relative overflow-hidden transition-colors ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-red-50 to-green-50'
    }`}>
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full animate-fall"
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

      <div className="max-w-2xl mx-auto relative z-10">
        <div className={`rounded-lg shadow-lg p-8 transition-colors ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-10 h-10 text-red-600" />
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Secret Santa
              </h1>
              <Gift className="w-10 h-10 text-green-600" />
            </div>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              🎄 Making spirits bright with surprise gift exchanges! 🎅
            </p>
          </div>

          {!assignments ? (
            <>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Enter Participant Names
                </h2>
                <div className="space-y-3">
                  {names.map((name, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => updateName(index, e.target.value)}
                        placeholder={`Person ${index + 1}`}
                        className={`flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-400' 
                            : 'bg-white border-gray-200 text-gray-800 focus:border-red-400'
                        }`}
                      />
                      {names.length > 2 && (
                        <button
                          onClick={() => removeNameField(index)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode 
                              ? 'text-red-400 hover:bg-gray-700' 
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addNameField}
                  className={`mt-4 w-full py-2 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400' 
                      : 'border-gray-300 text-gray-600 hover:border-green-400 hover:text-green-600'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Another Person
                </button>
              </div>

              <button
                onClick={generateAssignments}
                className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-green-700 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Generate Secret Santa Assignments
              </button>
            </>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                <h2 className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Assignments (click to reveal)
                </h2>
                {Object.entries(assignments).map(([giver, receiver]) => (
                  <div
                    key={giver}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      darkMode 
                        ? 'bg-gradient-to-r from-gray-700 to-gray-700 border-gray-600 hover:border-red-400' 
                        : 'bg-gradient-to-r from-red-50 to-green-50 border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {giver}
                        </span>
                        <span className={darkMode ? 'text-gray-300 mx-2' : 'text-gray-600 mx-2'}>
                          gives to
                        </span>
                        {revealedNames.has(giver) ? (
                          <span className="font-semibold text-green-600">
                            {receiver}
                          </span>
                        ) : (
                          <span className={`italic ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            Click to reveal
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleReveal(giver)}
                        className={`ml-4 p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-gray-600 hover:bg-gray-500' 
                            : 'bg-white hover:bg-gray-100'
                        }`}
                      >
                        {revealedNames.has(giver) ? (
                          <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        ) : (
                          <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generateAssignments}
                  className="flex-1 bg-gradient-to-r from-red-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Regenerate
                </button>
                <button
                  onClick={resetAll}
                  className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-gray-500' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Start Over
                </button>
              </div>
            </>
          )}
        </div>

        <div className={`text-center mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>© 2025 TechStudio (PTY) Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SecretSantaGenerator;

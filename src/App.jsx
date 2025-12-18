import React, { useState } from 'react';
import { Gift, RefreshCw, Eye, EyeOff, Plus, Trash2, Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
        <Card className={`shadow-2xl ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 backdrop-blur'}`}>
          <CardHeader>
            <div className="flex justify-end mb-2">
              <Button
                onClick={() => setDarkMode(!darkMode)}
                variant="ghost"
                size="icon"
                className={darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-3 mb-2">
              <Gift className="w-10 h-10 text-red-600" />
              <CardTitle className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Secret Santa
              </CardTitle>
              <Gift className="w-10 h-10 text-green-600" />
            </div>
            <CardDescription className={`text-center text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              🎄 Making spirits bright with surprise gift exchanges! 🎅
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!assignments ? (
              <>
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
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => updateName(index, e.target.value)}
                          placeholder={`Person ${index + 1}`}
                          className={`flex-1 ${
                            darkMode 
                              ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                              : 'bg-white border-slate-200'
                          }`}
                        />
                        {names.length > 2 && (
                          <Button
                            onClick={() => removeNameField(index)}
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={addNameField}
                    variant="outline"
                    className={`w-full border-dashed ${
                      darkMode 
                        ? 'border-slate-700 text-slate-300 hover:border-green-500 hover:text-green-400 hover:bg-slate-800' 
                        : 'border-slate-300 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Another Person
                  </Button>
                </div>

                <Button
                  onClick={generateAssignments}
                  className="w-full bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-semibold py-6 text-lg"
                  size="lg"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Generate Secret Santa Assignments
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    🎁 Assignments (click to reveal)
                  </h3>
                  
                  <div className="space-y-3">
                    {Object.entries(assignments).map(([giver, receiver]) => (
                      <Card
                        key={giver}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          darkMode 
                            ? 'bg-slate-800 border-slate-700 hover:border-red-500' 
                            : 'bg-gradient-to-r from-red-50 to-green-50 hover:border-red-300'
                        }`}
                        onClick={() => toggleReveal(giver)}
                      >
                        <CardContent className="p-4">
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
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleReveal(giver);
                              }}
                            >
                              {revealedNames.has(giver) ? (
                                <EyeOff className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                              ) : (
                                <Eye className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={generateAssignments}
                    className="flex-1 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-semibold"
                    size="lg"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={resetAll}
                    variant="outline"
                    size="lg"
                    className={darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : ''}
                  >
                    Start Over
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className={`text-center mt-6 text-sm ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
          <p>© 2025 TechStudio (PTY) Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SecretSantaGenerator;

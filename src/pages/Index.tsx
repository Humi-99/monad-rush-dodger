import { useState } from 'react';
import { GameCanvas } from '@/components/game/GameCanvas';
import { GameStats } from '@/components/game/GameStats';
import { Leaderboard } from '@/components/game/Leaderboard';
import { GameNarrator } from '@/components/game/GameNarrator';
import { NavBar } from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [gameEvents, setGameEvents] = useState<Array<{
    type: 'start' | 'hit' | 'collect' | 'levelUp' | 'gameOver';
    value?: number;
  }>>([{ type: 'start' }]);

  const [showStats, setShowStats] = useState(false);

  // Mock stats - in real app this would come from local storage or blockchain
  const playerStats = {
    highScore: 15420,
    totalGamesPlayed: 23,
    totalMonCollected: 156,
    bestLevel: 8,
    totalTimePlayed: 1847 // seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background/80">
      <NavBar />
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Main Game Area */}
            <div className="lg:col-span-3 space-y-6">
              <div className="text-center">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-game-neon-pink via-game-neon-purple to-game-neon-cyan bg-clip-text text-transparent mb-4">
                  Gas Dodger
                </h1>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Navigate the high-speed Monad blockchain while dodging expensive gas fees! 
                  Collect MON tokens and climb the leaderboards in this retro arcade experience.
                </p>
                <Badge className="bg-game-neon-purple/20 text-game-neon-purple border-game-neon-purple/30">
                  🚀 Built on Monad Chain - Ultra Fast Gaming
                </Badge>
              </div>

              <GameCanvas />
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={showStats ? "default" : "outline"}
                  onClick={() => setShowStats(true)}
                  className={showStats 
                    ? "bg-game-neon-cyan/20 text-game-neon-cyan border-game-neon-cyan/30" 
                    : "border-game-neon-cyan/30 text-game-neon-cyan hover:bg-game-neon-cyan/10"
                  }
                >
                  📊 Stats
                </Button>
                <Button
                  variant={!showStats ? "default" : "outline"}
                  onClick={() => setShowStats(false)}
                  className={!showStats 
                    ? "bg-game-neon-pink/20 text-game-neon-pink border-game-neon-pink/30" 
                    : "border-game-neon-pink/30 text-game-neon-pink hover:bg-game-neon-pink/10"
                  }
                >
                  🏆 Leaderboard
                </Button>
              </div>

              {showStats ? (
                <GameStats stats={playerStats} />
              ) : (
                <Leaderboard />
              )}
            </div>
          </div>

          {/* Game Info Section */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* How to Play */}
            <Card className="border-game-neon-cyan/30 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-game-neon-cyan flex items-center gap-2">
                  🕹️ How to Play
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="text-game-neon-pink">⌨️</span>
                    Use arrow keys or A/D to move your cute hedgehog
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-game-neon-pink">⛽</span>
                    Dodge red gas fee bombs to preserve your lives
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-game-neon-pink">💎</span>
                    Collect cyan MON tokens for extra points
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-game-neon-pink">📱</span>
                    Mobile friendly - drag to move on touch devices
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-game-neon-pink">🎵</span>
                    Enjoy synthwave music while you play
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Monad Facts */}
            <Card className="border-game-electric-blue/30 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-game-electric-blue flex items-center gap-2">
                  ⚡ Why Monad?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="text-game-electric-blue">🚀</span>
                    10,000+ TPS with parallel execution engine
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-game-electric-blue">💰</span>
                    Ultra-low gas fees make gaming affordable
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-game-electric-blue">🔗</span>
                    Full EVM compatibility for seamless migration
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-game-electric-blue">⚡</span>
                    Instant finality for real-time gaming
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-game-electric-blue">🌐</span>
                    Next-gen blockchain built for mass adoption
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-neon-purple/30">
          <p className="text-muted-foreground mb-4">
            Made by <span className="text-neon-cyan font-bold">humi</span>
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-neon-cyan hover:text-neon-cyan/80"
              onClick={() => window.open('https://www.monad.xyz/privacy-policy', '_blank')}
            >
              🔒 Privacy Policy
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-neon-pink hover:text-neon-pink/80"
              onClick={() => window.open('https://twitter.com/Humis110', '_blank')}
            >
              🐦 @Humis110
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-electric-blue hover:text-electric-blue/80"
              onClick={() => window.open('https://discord.com/users/humi_999', '_blank')}
            >
              💬 humi_999
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            ©All Rights reserved by 2025 Humi.HUMI developed Nad
          </p>
        </div>

        {/* AI Narrator */}
        <GameNarrator gameEvents={gameEvents} />
    </div>
  );
};

export default Index;
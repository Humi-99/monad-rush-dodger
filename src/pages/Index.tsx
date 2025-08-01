import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GameCanvas } from '@/components/game/GameCanvas';
import { GameStats } from '@/components/game/GameStats';
import { Leaderboard } from '@/components/game/Leaderboard';
import { GameNarrator } from '@/components/game/GameNarrator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import synthwaveBg from '@/assets/synthwave-bg.jpg';

const Index = () => {
  const { user, signOut } = useAuth();
  const [gameEvents, setGameEvents] = useState<Array<{
    type: 'start' | 'hit' | 'collect' | 'levelUp' | 'gameOver';
    value?: number;
  }>>([{ type: 'start' }]);

  const [showStats, setShowStats] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  // Mock stats - in real app this would come from local storage or blockchain
  const playerStats = {
    highScore: 15420,
    totalGamesPlayed: 23,
    totalMonCollected: 156,
    bestLevel: 8,
    totalTimePlayed: 1847 // seconds
  };

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${synthwaveBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent animate-neon-pulse mb-4">
            GAS FEE DODGER
          </h1>
          <p className="text-xl text-neon-cyan mb-2 animate-float">
            ⚡ Welcome to the MONad Multiverse ⚡
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Badge variant="outline" className="border-neon-pink text-neon-pink">
              🚀 Ultra-Fast Monad Chain
            </Badge>
            <Badge variant="outline" className="border-electric-blue text-electric-blue">
              💎 Collect MON Tokens
            </Badge>
            <Badge variant="outline" className="border-neon-purple text-neon-purple">
              🏆 On-Chain Leaderboard
            </Badge>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Main Game */}
          <div className="flex flex-col items-center gap-6">
            <GameCanvas />
            
            {/* Game Controls */}
            <div className="flex gap-4 flex-wrap justify-center">
              <Button 
                variant="neon" 
                size="lg"
                onClick={() => setShowStats(!showStats)}
              >
                📊 Stats
              </Button>
              
              {user ? (
                <div className="flex gap-4 items-center">
                  <span className="text-neon-cyan text-sm">
                    Welcome, {user.email?.split('@')[0]}!
                  </span>
                  <Button variant="cyber" size="lg" onClick={handleSignOut}>
                    🚪 Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="cyber" size="lg">
                    🔗 Sign In / Connect Wallet
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-6 w-full lg:w-96">
            {showStats ? (
              <GameStats stats={playerStats} />
            ) : (
              <Leaderboard />
            )}
            
            {/* Game Info */}
            <Card className="p-6 bg-card/50 backdrop-blur border-neon-cyan">
              <h3 className="text-lg font-bold text-neon-cyan mb-4">
                🎮 How to Play
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-neon-pink">⛽</span>
                  <span>Dodge falling gas fee bombs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-cyan">💎</span>
                  <span>Collect MON tokens for points</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-electric-blue">🚀</span>
                  <span>Survive as long as possible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-purple">🏆</span>
                  <span>Climb the on-chain leaderboard</span>
                </div>
              </div>
            </Card>

            {/* Crypto Education */}
            <Card className="p-6 bg-card/50 backdrop-blur border-game-warning">
              <h3 className="text-lg font-bold text-game-warning mb-4">
                💡 DeFi Facts
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-neon-pink">Monad</strong> uses parallel execution 
                  to process 10,000+ transactions per second!
                </p>
                <p>
                  <strong className="text-neon-cyan">Gas fees</strong> on Ethereum 
                  once reached $200+ per transaction during peak congestion.
                </p>
                <p>
                  <strong className="text-electric-blue">MEV bots</strong> can 
                  front-run transactions in milliseconds, stealing profits.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-neon-purple/30">
          <p className="text-muted-foreground mb-4">
            Built on <span className="text-neon-purple font-bold">Monad</span> • 
            Powered by <span className="text-neon-cyan font-bold">React</span> • 
            Styled with <span className="text-neon-pink font-bold">Tailwind</span>
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="sm" className="text-neon-cyan hover:text-neon-cyan/80">
              📚 Docs
            </Button>
            <Button variant="ghost" size="sm" className="text-neon-pink hover:text-neon-pink/80">
              💬 Discord
            </Button>
            <Button variant="ghost" size="sm" className="text-electric-blue hover:text-electric-blue/80">
              🐦 Twitter
            </Button>
          </div>
        </div>
      </div>

      {/* AI Narrator */}
      <GameNarrator gameEvents={gameEvents} />
    </div>
  );
};

export default Index;
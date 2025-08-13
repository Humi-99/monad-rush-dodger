import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface Game {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
  icon: string;
  color: string;
  borderColor: string;
  adContent?: {
    title: string;
    description: string;
    features: string[];
    releaseDate: string;
  };
}

const Games = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showAdDialog, setShowAdDialog] = useState(false);

  const games: Game[] = [
    {
      id: 'gas-dodger',
      title: 'Gas Dodger',
      description: 'Navigate the blockchain while dodging expensive gas fees and collecting MON tokens!',
      status: 'available',
      icon: '🦔',
      color: 'game-neon-pink',
      borderColor: 'game-neon-pink/30',
    },
    {
      id: 'mev-runner',
      title: 'MEV Runner',
      description: 'Outrun MEV bots and secure your transactions in this high-speed chase game.',
      status: 'coming-soon',
      icon: '🏃‍♂️',
      color: 'game-neon-cyan',
      borderColor: 'game-neon-cyan/30',
      adContent: {
        title: 'MEV Runner - Coming Soon!',
        description: 'Experience the thrill of outrunning MEV bots in this adrenaline-pumping blockchain game.',
        features: [
          'High-speed chases through the mempool',
          'Strategic transaction timing',
          'Advanced MEV protection mechanics',
          'Compete against real MEV strategies'
        ],
        releaseDate: 'Q2 2025'
      }
    },
    {
      id: 'defi-defender',
      title: 'DeFi Defender',
      description: 'Protect liquidity pools from attacks and earn rewards in this tower defense style game.',
      status: 'coming-soon',
      icon: '🛡️',
      color: 'game-electric-blue',
      borderColor: 'game-electric-blue/30',
      adContent: {
        title: 'DeFi Defender - Tower Defense Evolved!',
        description: 'Strategically defend DeFi protocols from various attack vectors in this innovative tower defense game.',
        features: [
          'Multiple defense strategies',
          'Real DeFi protocol mechanics',
          'Yield farming mini-games',
          'Protocol governance integration'
        ],
        releaseDate: 'Q3 2025'
      }
    },
    {
      id: 'liquidity-pool',
      title: 'Liquidity Pool Tycoon',
      description: 'Build and manage your own DeFi empire by creating optimal liquidity pools.',
      status: 'coming-soon',
      icon: '💧',
      color: 'game-neon-purple',
      borderColor: 'game-neon-purple/30',
      adContent: {
        title: 'Liquidity Pool Tycoon - DeFi Empire Builder!',
        description: 'Master the art of liquidity provision and build your DeFi empire from the ground up.',
        features: [
          'Advanced pool optimization',
          'Impermanent loss mitigation',
          'Cross-chain liquidity management',
          'Real-time market dynamics'
        ],
        releaseDate: 'Q4 2025'
      }
    }
  ];

  const handleGameClick = (game: Game) => {
    if (game.status === 'available') {
      navigate('/');
    } else {
      setSelectedGame(game);
      setShowAdDialog(true);
    }
  };

  const handleNotifyMe = () => {
    if (selectedGame) {
      // Here you could implement actual notification signup
      alert(`You'll be notified when ${selectedGame.title} is available!`);
      setShowAdDialog(false);
      setSelectedGame(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-game-neon-pink via-game-neon-purple to-game-neon-cyan bg-clip-text text-transparent mb-4">
            Monad Games
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of blockchain-powered arcade games built on Monad's lightning-fast network
          </p>
          <Badge className="mt-4 bg-game-neon-purple/20 text-game-neon-purple border-game-neon-purple/30">
            ⚡ Powered by Monad Chain
          </Badge>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {games.map((game) => (
            <Card 
              key={game.id}
              className={`border-${game.borderColor} bg-card/50 backdrop-blur hover:bg-card/70 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
              onClick={() => handleGameClick(game)}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${game.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{game.icon}</span>
                    <div>
                      <CardTitle className={`text-${game.color} text-xl`}>
                        {game.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {game.status === 'available' ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            ✅ Play Now
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                            🚧 Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative">
                <CardDescription className="text-muted-foreground mb-4">
                  {game.description}
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant={game.status === 'available' ? 'default' : 'outline'}
                    className={game.status === 'available' 
                      ? `bg-${game.color}/20 text-${game.color} border-${game.color}/30 hover:bg-${game.color}/30`
                      : `border-${game.color}/30 text-${game.color} hover:bg-${game.color}/10`
                    }
                  >
                    {game.status === 'available' ? '🎮 Play Game' : '📅 Learn More'}
                  </Button>
                  
                  {game.status === 'coming-soon' && (
                    <span className="text-xs text-muted-foreground">
                      Click for details
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Game Section */}
        <Card className="border-game-neon-pink/30 bg-card/50 backdrop-blur mt-12">
          <CardHeader>
            <CardTitle className="text-game-neon-pink flex items-center gap-2 text-2xl">
              🌟 Featured: Gas Dodger
            </CardTitle>
            <CardDescription>
              The original Monad arcade experience - available now!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-muted-foreground mb-4">
                  Experience the thrill of navigating Monad's high-speed blockchain while dodging 
                  expensive gas fees. Collect MON tokens, climb the leaderboards, and show off your 
                  skills in this addictive arcade-style game.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-game-neon-cyan text-game-neon-cyan">
                    Arcade Action
                  </Badge>
                  <Badge variant="outline" className="border-game-neon-purple text-game-neon-purple">
                    Leaderboards
                  </Badge>
                  <Badge variant="outline" className="border-game-electric-blue text-game-electric-blue">
                    Wallet Integration
                  </Badge>
                </div>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-game-neon-pink/20 text-game-neon-pink border-game-neon-pink/30 hover:bg-game-neon-pink/30"
                >
                  🚀 Play Now
                </Button>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">🦔</div>
                <p className="text-sm text-muted-foreground">
                  Join thousands of players on Monad!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advertisement Dialog */}
      <Dialog open={showAdDialog} onOpenChange={setShowAdDialog}>
        <DialogContent className="border-game-neon-cyan/30 bg-card/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="text-game-neon-cyan flex items-center gap-2">
              {selectedGame?.icon} {selectedGame?.adContent?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedGame?.adContent?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedGame?.adContent && (
              <>
                <div>
                  <h4 className="font-semibold text-game-neon-pink mb-2">🎮 Game Features:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {selectedGame.adContent.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-game-neon-cyan rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-game-neon-purple/30">
                  <div>
                    <p className="text-sm font-medium">Expected Release:</p>
                    <p className="text-game-neon-purple font-semibold">{selectedGame.adContent.releaseDate}</p>
                  </div>
                  <Button 
                    onClick={handleNotifyMe}
                    className="bg-game-neon-cyan/20 text-game-neon-cyan border-game-neon-cyan/30 hover:bg-game-neon-cyan/30"
                  >
                    🔔 Notify Me
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Games;
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const { account, isConnected, balance } = useWallet();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neon-purple/30 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center gap-4">
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate('/')}
            >
              GAS DODGER
            </h1>
            <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
              ⚡ Monad Chain
            </Badge>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              className={`${location.pathname === '/' ? 'text-neon-cyan bg-neon-cyan/10' : 'text-neon-cyan hover:text-neon-cyan/80'}`}
              onClick={() => navigate('/')}
            >
              🎮 Game
            </Button>
            <Button 
              variant="ghost" 
              className={`${location.pathname === '/games' ? 'text-neon-pink bg-neon-pink/10' : 'text-neon-pink hover:text-neon-pink/80'}`}
              onClick={() => navigate('/games')}
            >
              🕹️ Games
            </Button>
            <Button 
              variant="ghost" 
              className={`${location.pathname === '/leaderboard' ? 'text-electric-blue bg-electric-blue/10' : 'text-electric-blue hover:text-electric-blue/80'}`}
              onClick={() => navigate('/leaderboard')}
            >
              🏆 Leaderboard
            </Button>
            <Button 
              variant="ghost" 
              className={`${location.pathname === '/about' ? 'text-neon-purple bg-neon-purple/10' : 'text-neon-purple hover:text-neon-purple/80'}`}
              onClick={() => navigate('/about')}
            >
              📚 About
            </Button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {isConnected && (
              <div className="flex items-center gap-3">
                <div className="text-right text-sm">
                  <div className="text-neon-cyan font-mono">
                    {formatAddress(account!)}
                  </div>
                  {balance && (
                    <div className="text-xs text-muted-foreground">
                      {parseFloat(balance).toFixed(4)} ETH
                    </div>
                  )}
                </div>
                <Button variant="cyber" size="sm" onClick={signOut}>
                  🚪 Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
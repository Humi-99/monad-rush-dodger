import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';

export const NavBar = () => {
  const { account, isConnected, connecting, connectWallet, disconnectWallet, balance } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neon-purple/30 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              GAS FEE DODGER
            </h1>
            <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
              ⚡ Monad Chain
            </Badge>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-neon-cyan hover:text-neon-cyan/80">
              🎮 Game
            </Button>
            <Button variant="ghost" className="text-neon-pink hover:text-neon-pink/80">
              🏆 Leaderboard
            </Button>
            <Button variant="ghost" className="text-electric-blue hover:text-electric-blue/80">
              📚 About
            </Button>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {isConnected ? (
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
                <Button variant="cyber" size="sm" onClick={disconnectWallet}>
                  🚪 Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                variant="neon" 
                onClick={connectWallet}
                disabled={connecting}
              >
                {connecting ? '🔄 Connecting...' : '🦊 Connect MetaMask'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
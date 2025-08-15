import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from 'sonner';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { user, signInWithWallet } = useAuth();
  const { account, isConnected, connectWallet, connecting } = useWallet();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleWalletAuth = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithWallet();
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Welcome to Gas Dodger!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to authenticate with wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-game-neon-pink via-game-neon-purple to-game-neon-cyan bg-clip-text text-transparent">
            Welcome to Gas Dodger
          </h1>
          <p className="text-muted-foreground">
            Connect your EVM wallet to start playing and compete on the leaderboards!
          </p>
          <Badge className="bg-game-neon-purple/20 text-game-neon-purple border-game-neon-purple/30">
            🚀 Built on Monad Chain - Ultra Fast Gaming
          </Badge>
        </div>

        {/* Auth Card */}
        <Card className="border-game-neon-cyan/30 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-game-neon-cyan flex items-center gap-2 justify-center">
              🔐 Connect Your Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isConnected ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Choose how you want to connect your EVM wallet:
                </p>
                
                <Button
                  onClick={handleConnectWallet}
                  disabled={connecting}
                  className="w-full bg-game-neon-cyan/20 text-game-neon-cyan border border-game-neon-cyan/30 hover:bg-game-neon-cyan/30"
                  size="lg"
                >
                  {connecting ? (
                    <>🔄 Connecting...</>
                  ) : (
                    <>🦊 Connect MetaMask</>
                  )}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  Don't have MetaMask? 
                  <a 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-game-neon-cyan hover:underline ml-1"
                  >
                    Download here
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-4 bg-game-neon-cyan/10 rounded-lg border border-game-neon-cyan/30">
                  <div className="text-game-neon-cyan font-mono text-sm">
                    ✅ Wallet Connected
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {account}
                  </div>
                </div>

                <Button
                  onClick={handleWalletAuth}
                  disabled={loading}
                  className="w-full bg-game-neon-pink/20 text-game-neon-pink border border-game-neon-pink/30 hover:bg-game-neon-pink/30"
                  size="lg"
                >
                  {loading ? (
                    <>🔄 Creating Account...</>
                  ) : (
                    <>🎮 Enter Game</>
                  )}
                </Button>
              </div>
            )}

            {/* Game Features */}
            <div className="space-y-3 text-xs text-muted-foreground border-t border-game-neon-purple/30 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-game-neon-pink">⚡</span>
                Ultra-low gas fees on Monad Chain
              </div>
              <div className="flex items-center gap-2">
                <span className="text-game-neon-cyan">🏆</span>
                Compete on global leaderboards
              </div>
              <div className="flex items-center gap-2">
                <span className="text-game-electric-blue">💎</span>
                Collect MON tokens and earn rewards
              </div>
              <div className="flex items-center gap-2">
                <span className="text-game-neon-purple">🎵</span>
                Immersive synthwave gaming experience
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Your wallet address is used as your unique gaming identity</p>
          <p className="mt-1">No personal information is stored or required</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
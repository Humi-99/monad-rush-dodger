import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import synthwaveBg from '@/assets/synthwave-bg.jpg';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, signUp, signIn, signInWithGoogle, signInWithTwitter } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = isSignUp 
        ? await signUp(email, password, username)
        : await signIn(email, password);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(isSignUp ? 'Check your email for verification' : 'Welcome back!');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleTwitterAuth = async () => {
    setLoading(true);
    const { error } = await signInWithTwitter();
    if (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background relative"
      style={{
        backgroundImage: `url(${synthwaveBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <Card className="relative z-10 w-full max-w-md p-8 bg-card/80 backdrop-blur border-neon-cyan">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent mb-2">
            {isSignUp ? 'Join the MONad' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? 'Create your account to climb the leaderboard' : 'Sign in to continue your journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/50"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant="neon"
            disabled={loading}
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-4 text-sm text-muted-foreground">or</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleGoogleAuth}
            variant="cyber" 
            className="w-full"
            disabled={loading}
          >
            🔗 Continue with Google
          </Button>
          
          <Button 
            onClick={handleTwitterAuth}
            variant="synthwave" 
            className="w-full"
            disabled={loading}
          >
            🐦 Continue with Twitter
          </Button>
        </div>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="text-center mt-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Game
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
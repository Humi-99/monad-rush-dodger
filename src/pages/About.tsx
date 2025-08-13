import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-game-neon-pink via-game-neon-purple to-game-neon-cyan bg-clip-text text-transparent mb-4">
            Gas Dodger
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navigate the high-speed world of Monad blockchain gaming while dodging expensive gas fees
          </p>
          <Badge className="mt-4 bg-game-neon-purple/20 text-game-neon-purple border-game-neon-purple/30">
            ⚡ Built on Monad Chain
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* What is Gas Dodger */}
          <Card className="border-game-neon-pink/30 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-game-neon-pink flex items-center gap-2">
                🎮 What is Gas Dodger?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Gas Dodger is an arcade-style game that puts you in control of a cute hedgehog navigating 
                the fast-paced world of blockchain transactions on Monad.
              </p>
              <div className="space-y-2">
                <p className="text-sm"><span className="text-game-neon-cyan">⛽</span> Dodge expensive gas fees</p>
                <p className="text-sm"><span className="text-game-neon-pink">💎</span> Collect MON tokens</p>
                <p className="text-sm"><span className="text-game-electric-blue">🚀</span> Experience Monad's speed</p>
              </div>
            </CardContent>
          </Card>

          {/* How to Play */}
          <Card className="border-game-neon-cyan/30 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-game-neon-cyan flex items-center gap-2">
                🕹️ How to Play
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-game-neon-pink/20 rounded-full flex items-center justify-center text-sm">1</span>
                  <span className="text-sm">Use arrow keys or A/D to move your hedgehog</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-game-neon-pink/20 rounded-full flex items-center justify-center text-sm">2</span>
                  <span className="text-sm">Avoid red gas fee bombs (⛽)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-game-neon-pink/20 rounded-full flex items-center justify-center text-sm">3</span>
                  <span className="text-sm">Collect cyan MON tokens (💎) for points</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-game-neon-pink/20 rounded-full flex items-center justify-center text-sm">4</span>
                  <span className="text-sm">Survive as long as possible!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Section */}
        <Card className="border-game-electric-blue/30 bg-card/50 backdrop-blur mb-12">
          <CardHeader>
            <CardTitle className="text-game-electric-blue flex items-center gap-2">
              ⚡ Built on Monad Blockchain
            </CardTitle>
            <CardDescription>
              Experience the future of gaming with ultra-fast blockchain technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold text-game-neon-pink mb-2">Lightning Fast</h4>
                <p className="text-sm text-muted-foreground">
                  10,000+ TPS with instant finality on Monad's parallel execution
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-game-neon-cyan mb-2">Low Cost</h4>
                <p className="text-sm text-muted-foreground">
                  Minimal gas fees make gaming accessible to everyone
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔗</div>
                <h4 className="font-semibold text-game-electric-blue mb-2">EVM Compatible</h4>
                <p className="text-sm text-muted-foreground">
                  Full Ethereum compatibility with enhanced performance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Creator Section */}
        <Card className="border-game-neon-purple/30 bg-card/50 backdrop-blur mb-12">
          <CardHeader>
            <CardTitle className="text-game-neon-purple flex items-center gap-2">
              👨‍💻 Meet the Creator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold text-game-neon-pink mb-2">humi</h3>
                <p className="text-muted-foreground mb-4">
                  Blockchain gaming enthusiast and developer passionate about bringing 
                  fun, accessible games to the Monad ecosystem.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-game-neon-cyan text-game-neon-cyan hover:bg-game-neon-cyan/10"
                    onClick={() => window.open('https://twitter.com/Humis110', '_blank')}
                  >
                    🐦 @Humis110
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-game-neon-pink text-game-neon-pink hover:bg-game-neon-pink/10"
                    onClick={() => window.open('https://discord.com/users/humi_999', '_blank')}
                  >
                    💬 humi_999
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="border-game-neon-pink/30 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-game-neon-pink flex items-center gap-2">
              🗺️ Roadmap
            </CardTitle>
            <CardDescription>
              What's coming next to the Gas Dodger universe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 shrink-0">
                  ✅ Complete
                </Badge>
                <div>
                  <h4 className="font-semibold">Gas Dodger Core Game</h4>
                  <p className="text-sm text-muted-foreground">Basic gameplay with leaderboards and wallet integration</p>
                </div>
              </div>
              
              <Separator className="border-game-neon-purple/30" />
              
              <div className="flex items-start gap-4">
                <Badge className="bg-game-neon-cyan/20 text-game-neon-cyan border-game-neon-cyan/30 shrink-0">
                  🚧 In Progress
                </Badge>
                <div>
                  <h4 className="font-semibold">Enhanced Gaming Experience</h4>
                  <p className="text-sm text-muted-foreground">Power-ups, achievements, and multiplayer modes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Badge className="bg-game-electric-blue/20 text-game-electric-blue border-game-electric-blue/30 shrink-0">
                  📅 Coming Soon
                </Badge>
                <div>
                  <h4 className="font-semibold">MEV Runner</h4>
                  <p className="text-sm text-muted-foreground">Navigate MEV bot attacks while securing transactions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Badge className="bg-game-neon-purple/20 text-game-neon-purple border-game-neon-purple/30 shrink-0">
                  🔮 Future
                </Badge>
                <div>
                  <h4 className="font-semibold">DeFi Gaming Suite</h4>
                  <p className="text-sm text-muted-foreground">Complete collection of DeFi-themed arcade games</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
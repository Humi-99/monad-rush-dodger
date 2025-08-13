import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaderboard } from "@/components/game/Leaderboard";

// Mock simulator data for demo purposes
const simulatorData = [
  { rank: 1, wallet: "0x1234...demo", score: 15420, level: 15, mon_tokens: 89, created_at: "2025-01-21T10:30:00Z" },
  { rank: 2, wallet: "0x5678...test", score: 12850, level: 12, mon_tokens: 76, created_at: "2025-01-21T09:15:00Z" },
  { rank: 3, wallet: "0x9abc...play", score: 11200, level: 11, mon_tokens: 68, created_at: "2025-01-21T08:45:00Z" },
  { rank: 4, wallet: "0xdef0...game", score: 9750, level: 9, mon_tokens: 55, created_at: "2025-01-21T07:30:00Z" },
  { rank: 5, wallet: "0x2468...cool", score: 8900, level: 8, mon_tokens: 48, created_at: "2025-01-21T06:20:00Z" },
  { rank: 6, wallet: "0x1357...epic", score: 7850, level: 7, mon_tokens: 42, created_at: "2025-01-21T05:10:00Z" },
  { rank: 7, wallet: "0x9753...pro", score: 6800, level: 6, mon_tokens: 35, created_at: "2025-01-21T04:00:00Z" },
  { rank: 8, wallet: "0x8642...ace", score: 5900, level: 5, mon_tokens: 28, created_at: "2025-01-21T03:30:00Z" },
];

const SimulatorLeaderboard = () => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-400";
      case 2: return "text-gray-300";
      case 3: return "text-amber-600";
      default: return "text-game-neon-cyan";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🏆";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return rank.toString();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
          🧪 Simulator Data
        </Badge>
        <span className="text-xs text-muted-foreground">Demo leaderboard for testing</span>
      </div>
      
      {simulatorData.map((entry) => (
        <div key={entry.rank} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`text-2xl font-bold min-w-[3rem] text-center ${getRankColor(entry.rank)}`}>
              {getRankIcon(entry.rank)}
            </div>
            <div>
              <div className="font-mono text-sm text-game-neon-cyan">
                {entry.wallet}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(entry.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <div className="font-bold text-game-neon-pink">{entry.score.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
            <div>
              <div className="font-bold text-game-neon-purple">Level {entry.level}</div>
              <div className="text-xs text-muted-foreground">{entry.mon_tokens} MON</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState("real");
  const [timeFilter, setTimeFilter] = useState("all-time");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-game-neon-pink via-game-neon-purple to-game-neon-cyan bg-clip-text text-transparent mb-4">
            Leaderboards
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how you stack up against other Gas Dodger players on Monad
          </p>
          <Badge className="mt-4 bg-game-neon-purple/20 text-game-neon-purple border-game-neon-purple/30">
            🏆 Live Competition
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-game-neon-pink/30 bg-card/50 backdrop-blur text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-game-neon-pink mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Total Players</div>
            </CardContent>
          </Card>
          <Card className="border-game-neon-cyan/30 bg-card/50 backdrop-blur text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-game-neon-cyan mb-2">15,420</div>
              <div className="text-sm text-muted-foreground">Highest Score</div>
            </CardContent>
          </Card>
          <Card className="border-game-electric-blue/30 bg-card/50 backdrop-blur text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-game-electric-blue mb-2">23,580</div>
              <div className="text-sm text-muted-foreground">MON Collected</div>
            </CardContent>
          </Card>
          <Card className="border-game-neon-purple/30 bg-card/50 backdrop-blur text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-game-neon-purple mb-2">842</div>
              <div className="text-sm text-muted-foreground">Games Played Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Leaderboard */}
        <Card className="border-game-neon-cyan/30 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-game-neon-cyan flex items-center gap-2">
                  🏆 Gas Dodger Champions
                </CardTitle>
                <CardDescription>
                  Top players competing on Monad blockchain
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={timeFilter === "daily" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter("daily")}
                  className={timeFilter === "daily" 
                    ? "bg-game-neon-pink/20 text-game-neon-pink border-game-neon-pink/30" 
                    : "border-game-neon-pink/30 text-game-neon-pink hover:bg-game-neon-pink/10"
                  }
                >
                  Daily
                </Button>
                <Button
                  variant={timeFilter === "weekly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter("weekly")}
                  className={timeFilter === "weekly" 
                    ? "bg-game-neon-cyan/20 text-game-neon-cyan border-game-neon-cyan/30" 
                    : "border-game-neon-cyan/30 text-game-neon-cyan hover:bg-game-neon-cyan/10"
                  }
                >
                  Weekly
                </Button>
                <Button
                  variant={timeFilter === "all-time" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter("all-time")}
                  className={timeFilter === "all-time" 
                    ? "bg-game-electric-blue/20 text-game-electric-blue border-game-electric-blue/30" 
                    : "border-game-electric-blue/30 text-game-electric-blue hover:bg-game-electric-blue/10"
                  }
                >
                  All Time
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-muted/30">
                <TabsTrigger 
                  value="real"
                  className="data-[state=active]:bg-game-neon-cyan/20 data-[state=active]:text-game-neon-cyan"
                >
                  🔗 Real Leaderboard
                </TabsTrigger>
                <TabsTrigger 
                  value="simulator"
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
                >
                  🧪 Simulator
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="real" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-game-neon-cyan/20 text-game-neon-cyan border-game-neon-cyan/30">
                      📊 Live Data from Supabase
                    </Badge>
                  </div>
                  <Leaderboard />
                </div>
              </TabsContent>
              
              <TabsContent value="simulator" className="mt-6">
                <SimulatorLeaderboard />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* How to Compete */}
        <Card className="border-game-neon-purple/30 bg-card/50 backdrop-blur mt-12">
          <CardHeader>
            <CardTitle className="text-game-neon-purple flex items-center gap-2">
              🎯 How to Compete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🦊</div>
                <h4 className="font-semibold text-game-neon-pink mb-2">1. Connect Wallet</h4>
                <p className="text-sm text-muted-foreground">
                  Connect your MetaMask to save scores and compete
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎮</div>
                <h4 className="font-semibold text-game-neon-cyan mb-2">2. Play & Score</h4>
                <p className="text-sm text-muted-foreground">
                  Dodge gas fees and collect MON tokens for points
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="font-semibold text-game-electric-blue mb-2">3. Climb Rankings</h4>
                <p className="text-sm text-muted-foreground">
                  Your best scores automatically appear on the leaderboard
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;
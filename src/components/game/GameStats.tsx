import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameStatsProps {
  stats: {
    highScore: number;
    totalGamesPlayed: number;
    totalMonCollected: number;
    bestLevel: number;
    totalTimePlayed: number;
  };
}

export const GameStats = ({ stats }: GameStatsProps) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-neon-purple">
      <h3 className="text-xl font-bold text-neon-pink mb-4 animate-neon-pulse">
        📊 Player Stats
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-neon-cyan">
            {stats.highScore.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">High Score</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-electric-blue">
            {stats.totalGamesPlayed}
          </div>
          <div className="text-sm text-muted-foreground">Games Played</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-neon-purple">
            {stats.totalMonCollected}
          </div>
          <div className="text-sm text-muted-foreground">MON Collected</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-game-warning">
            {stats.bestLevel}
          </div>
          <div className="text-sm text-muted-foreground">Best Level</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {Math.floor(stats.totalTimePlayed / 60)}m
          </div>
          <div className="text-sm text-muted-foreground">Time Played</div>
        </div>
        
        <div className="text-center">
          <Badge variant="secondary" className="text-lg py-2">
            🏆 Node Runner
          </Badge>
          <div className="text-xs text-muted-foreground mt-1">Rank</div>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-neon-cyan/30">
        <div className="text-sm text-neon-cyan font-mono">
          💡 Pro Tip: Collect MON tokens to unlock special abilities and climb the Monad leaderboard!
        </div>
      </div>
    </Card>
  );
};
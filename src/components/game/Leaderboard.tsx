import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  rank: number;
  wallet: string;
  score: number;
  level: number;
  monCollected: number;
  timestamp: Date;
}

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data: scores, error } = await supabase
        .from('game_scores')
        .select(`
          score,
          level_reached,
          mon_tokens,
          created_at,
          user_id
        `)
        .order('score', { ascending: false })
        .limit(10);

      if (error) throw error;

      const formattedData = scores?.map((entry, index) => ({
        rank: index + 1,
        wallet: `Player_${entry.user_id.slice(0, 8)}`,
        score: entry.score,
        level: entry.level_reached,
        monCollected: entry.mon_tokens,
        timestamp: new Date(entry.created_at)
      })) || [];

      setLeaderboardData(formattedData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback to mock data
      setLeaderboardData([
        {
          rank: 1,
          wallet: "CryptoNinja",
          score: 50000,
          level: 15,
          monCollected: 234,
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          rank: 2,
          wallet: "GasDodger",
          score: 42000,
          level: 12,
          monCollected: 189,
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          rank: 3,
          wallet: "MONster",
          score: 38500,
          level: 11,
          monCollected: 156,
          timestamp: new Date(Date.now() - 10800000)
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-game-warning";
      case 2: return "text-muted-foreground";
      case 3: return "text-game-danger";
      default: return "text-foreground";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-electric-blue">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-electric-blue animate-neon-pulse">
          🏆 Monad Leaderboard
        </h3>
        <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
          Live On-Chain
        </Badge>
      </div>
      
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-muted-foreground py-8">Loading leaderboard...</div>
        ) : leaderboardData.length > 0 ? (
          leaderboardData.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-neon-purple/30 hover:border-neon-purple/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`text-xl font-bold ${getRankColor(entry.rank)}`}>
                  {getRankIcon(entry.rank)}
                </div>
                
                <div>
                  <div className="font-mono text-sm text-neon-cyan">
                    {entry.wallet}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {entry.timestamp.toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-neon-pink">
                  {entry.score.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Lvl {entry.level} • {entry.monCollected} MON
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">No scores yet. Be the first!</div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-neon-purple/30">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Your rank: <span className="text-neon-cyan">#42</span>
          </div>
          <Button variant="outline" size="sm" className="border-neon-pink text-neon-pink hover:bg-neon-pink/10">
            Connect Wallet
          </Button>
        </div>
      </div>
    </Card>
  );
};
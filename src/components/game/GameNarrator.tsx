import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameNarratorProps {
  gameEvents: {
    type: 'start' | 'hit' | 'collect' | 'levelUp' | 'gameOver';
    value?: number;
  }[];
}

export const GameNarrator = ({ gameEvents }: GameNarratorProps) => {
  const [currentMessage, setCurrentMessage] = useState("Welcome to the MONad Multiverse! 🚀");
  const [isVisible, setIsVisible] = useState(true);

  const narratorQuotes = {
    start: [
      "Welcome to the MONad Multiverse! Time to dodge some fees! 🚀",
      "Another brave Node Runner enters the chaos! 💫",
      "Gas fees are coming... but Monad's speed is your advantage! ⚡"
    ],
    hit: [
      "Ouch! That gas bomb hit harder than Ethereum in 2021! 💥",
      "A wild gas fee appears! Your wallet feels lighter... 💸",
      "That'll teach you to use slow chains! 🐌",
      "Gas fees: the real boss battle of crypto! ⛽"
    ],
    collect: [
      "Sweet! MON tokens are the future! 💎",
      "Cha-ching! Another MON in the bag! 🎯",
      "Collecting tokens like a true DeFi degen! 🔥",
      "Monad rewards the fast and fearless! ⚡"
    ],
    levelUp: [
      "Level up! The multiverse gets more dangerous... 📈",
      "Difficulty spike incoming! Hope you're ready! 🌪️",
      "Welcome to the next dimension of chaos! 🌀",
      "More speed = more problems! 🏃‍♂️"
    ],
    gameOver: [
      "RIP Node Runner. The gas fees got you... ⚰️",
      "Game Over! Time to respawn and try again! 💀",
      "The multiverse claims another victim... 👻",
      "Even the best runners get caught eventually! 🏁"
    ]
  };

  const cryptoFacts = [
    "Did you know? Monad can process 10,000+ TPS! 🚄",
    "Fun fact: Gas fees on Ethereum once hit $200+ per transaction! 💸",
    "Monad uses parallel execution to avoid the gas fee nightmare! ⚡",
    "The longest pending transaction on Ethereum lasted 3 days! ⏰",
    "MEV bots can front-run your transactions in milliseconds! 🤖"
  ];

  useEffect(() => {
    const latestEvent = gameEvents[gameEvents.length - 1];
    if (!latestEvent) return;

    const quotes = narratorQuotes[latestEvent.type];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    setCurrentMessage(randomQuote);
    setIsVisible(true);

    // Auto-hide after a few seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [gameEvents]);

  const showRandomFact = () => {
    const randomFact = cryptoFacts[Math.floor(Math.random() * cryptoFacts.length)];
    setCurrentMessage(randomFact);
    setIsVisible(true);
    
    setTimeout(() => setIsVisible(false), 6000);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={showRandomFact}
          variant="outline"
          size="sm"
          className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 animate-float"
        >
          💡 Crypto Fact
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 max-w-xs p-4 bg-card/90 backdrop-blur border-neon-pink shadow-[0_0_20px_rgba(255,0,255,0.3)] z-50 animate-float">
      <div className="flex items-start gap-3">
        <div className="text-2xl animate-neon-pulse">🤖</div>
        <div>
          <div className="text-xs text-neon-cyan font-bold mb-1">GASSY - AI Navigator</div>
          <div className="text-sm text-foreground font-mono leading-relaxed">
            {currentMessage}
          </div>
        </div>
        <Button
          onClick={() => setIsVisible(false)}
          variant="ghost"
          size="sm"
          className="p-1 h-auto text-muted-foreground hover:text-foreground"
        >
          ✕
        </Button>
      </div>
    </Card>
  );
};
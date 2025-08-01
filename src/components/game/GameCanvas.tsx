import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from "sonner";
import { useAudio } from '@/hooks/useAudio';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'gas' | 'mon' | 'powerup' | 'bomb';
  color?: string;
  velocity?: number;
}

interface GameState {
  score: number;
  lives: number;
  level: number;
  gameOver: boolean;
  paused: boolean;
  monTokens: number;
}

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const keysRef = useRef<Set<string>>(new Set());
  const touchRef = useRef<{ isDragging: boolean; startX: number; playerStartX: number }>({
    isDragging: false,
    startX: 0,
    playerStartX: 0
  });
  const { user } = useAuth();

  // Audio hooks
  const bipSound = useAudio('/sounds/bip.wav', { volume: 0.7 });
  const boomSound = useAudio('/sounds/boom.wav', { volume: 0.8 });
  const backgroundMusic = useAudio('/sounds/vexento-pixel-party.mp3', { 
    volume: 0.3, 
    loop: true 
  });
  
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    gameOver: false,
    paused: false,
    monTokens: 0
  });

  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [player, setPlayer] = useState<GameObject>({
    x: 400,
    y: 550,
    width: 30,
    height: 30,
    type: 'player'
  });

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const PLAYER_SPEED = 5;
  const ENEMY_SPEED = 2;

  // Generate random gas fee bomb
  const createGasBomb = useCallback(() => {
    return {
      x: Math.random() * (CANVAS_WIDTH - 40),
      y: -40,
      width: 40,
      height: 40,
      type: 'gas' as const,
      velocity: ENEMY_SPEED + Math.random() * 2,
      color: '#ff4444'
    };
  }, []);

  // Generate MON token collectible
  const createMonToken = useCallback(() => {
    return {
      x: Math.random() * (CANVAS_WIDTH - 25),
      y: -25,
      width: 25,
      height: 25,
      type: 'mon' as const,
      velocity: ENEMY_SPEED * 0.8,
      color: '#ff00ff'
    };
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      
      if (e.key === ' ') {
        e.preventDefault();
        if (gameState.gameOver) {
          restartGame();
        } else {
          setGameState(prev => ({ ...prev, paused: !prev.paused }));
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.gameOver]);

  // Handle touch input for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      
      touchRef.current = {
        isDragging: true,
        startX: touchX,
        playerStartX: player.x
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!touchRef.current.isDragging) return;
      
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const deltaX = touchX - touchRef.current.startX;
      
      setPlayer(prev => {
        const newX = Math.max(0, Math.min(CANVAS_WIDTH - prev.width, touchRef.current.playerStartX + deltaX));
        return { ...prev, x: newX };
      });
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      touchRef.current.isDragging = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [player.x]);

  // Update player position based on input
  const updatePlayer = useCallback(() => {
    setPlayer(prev => {
      let newX = prev.x;
      
      if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a')) {
        newX = Math.max(0, prev.x - PLAYER_SPEED);
      }
      if (keysRef.current.has('ArrowRight') || keysRef.current.has('d')) {
        newX = Math.min(CANVAS_WIDTH - prev.width, prev.x + PLAYER_SPEED);
      }
      
      return { ...prev, x: newX };
    });
  }, []);

  // Check collision between two objects
  const checkCollision = (obj1: GameObject, obj2: GameObject) => {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  };

  // Update game objects
  const updateGameObjects = useCallback(() => {
    setGameObjects(prevObjects => {
      const newObjects = prevObjects
        .map(obj => ({ ...obj, y: obj.y + (obj.velocity || ENEMY_SPEED) }))
        .filter(obj => obj.y < CANVAS_HEIGHT + 50);

      // Check collisions with player
      const collisions = newObjects.filter(obj => checkCollision(player, obj));
      
      collisions.forEach(collision => {
        if (collision.type === 'gas') {
          setGameState(prev => {
            const newLives = prev.lives - 1;
            if (newLives <= 0) {
              toast("Game Over! Press SPACE to restart");
              return { ...prev, lives: 0, gameOver: true };
            }
            toast(`Gas hit! Lives remaining: ${newLives}`);
            return { ...prev, lives: newLives };
          });
        } else if (collision.type === 'mon') {
          bipSound.play();
          setGameState(prev => ({
            ...prev,
            score: prev.score + 50,
            monTokens: prev.monTokens + 1
          }));
          toast("MON token collected! +50 points");
        }
      });

      // Remove collected/hit objects
      return newObjects.filter(obj => !collisions.includes(obj));
    });
  }, [player]);

  // Spawn new objects
  const spawnObjects = useCallback(() => {
    if (Math.random() < 0.02 + gameState.level * 0.005) {
      setGameObjects(prev => [...prev, createGasBomb()]);
    }
    
    if (Math.random() < 0.008) {
      setGameObjects(prev => [...prev, createMonToken()]);
    }
  }, [gameState.level, createGasBomb, createMonToken]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameState.paused && !gameState.gameOver) {
      updatePlayer();
      updateGameObjects();
      spawnObjects();
      
      // Increase score over time
      setGameState(prev => ({
        ...prev,
        score: prev.score + 1,
        level: Math.floor(prev.score / 1000) + 1
      }));
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.paused, gameState.gameOver, updatePlayer, updateGameObjects, spawnObjects]);

  // Start game loop
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  // Save game score to database
  const saveGameScore = async (finalScore: number, monTokens: number, level: number) => {
    if (!user) return;
    
    try {
      await supabase.from('game_scores').insert({
        user_id: user.id,
        score: finalScore,
        mon_tokens: monTokens,
        level_reached: level
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  // Restart game
  const restartGame = () => {
    // Save score if user is logged in and game was played
    if (user && gameState.score > 0) {
      saveGameScore(gameState.score, gameState.monTokens, gameState.level);
    }

    setGameState({
      score: 0,
      lives: 3,
      level: 1,
      gameOver: false,
      paused: false,
      monTokens: 0
    });
    setGameObjects([]);
    setPlayer({
      x: 400,
      y: 550,
      width: 30,
      height: 30,
      type: 'player'
    });
    toast("New game started! Use arrow keys to dodge gas fees!");
  };

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with synthwave gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1a0b2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f051d');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid lines for retro effect
    ctx.strokeStyle = '#ff00ff33';
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_WIDTH; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < CANVAS_HEIGHT; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }

    // Draw cute hedgehog character
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 15;
    
    // Character body (purple)
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(player.x + 3, player.y + 15, 24, 15);
    
    // Character head (cream/beige)
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#f5f5dc';
    ctx.beginPath();
    ctx.arc(player.x + 15, player.y + 12, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Spiky hair/spines (dark purple)
    ctx.fillStyle = '#4c1d95';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(player.x + 8 + i * 3, player.y + 5);
      ctx.lineTo(player.x + 6 + i * 3, player.y);
      ctx.lineTo(player.x + 10 + i * 3, player.y);
      ctx.closePath();
      ctx.fill();
    }
    
    // Eyes
    ctx.fillStyle = '#ff69b4';
    ctx.beginPath();
    ctx.arc(player.x + 12, player.y + 10, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x + 18, player.y + 10, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye shine
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(player.x + 13, player.y + 9, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x + 19, player.y + 9, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Pink cheeks
    ctx.fillStyle = '#ff9baa';
    ctx.beginPath();
    ctx.arc(player.x + 9, player.y + 12, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x + 21, player.y + 12, 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Little feet
    ctx.fillStyle = '#ff69b4';
    ctx.fillRect(player.x + 8, player.y + 28, 4, 2);
    ctx.fillRect(player.x + 18, player.y + 28, 4, 2);

    // Draw game objects
    gameObjects.forEach(obj => {
      if (obj.type === 'gas') {
        ctx.shadowColor = '#ff4444';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        
        // Gas bomb details
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px monospace';
        ctx.fillText('⛽', obj.x + 12, obj.y + 25);
      } else if (obj.type === 'mon') {
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        
        // MON token details
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px monospace';
        ctx.fillText('M', obj.x + 8, obj.y + 18);
      }
    });

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw UI overlay
    ctx.fillStyle = '#ff00ff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`Score: ${gameState.score}`, 20, 30);
    ctx.fillText(`Lives: ${gameState.lives}`, 20, 60);
    ctx.fillText(`Level: ${gameState.level}`, 20, 90);
    ctx.fillText(`MON: ${gameState.monTokens}`, 20, 120);

    if (gameState.paused && !gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      ctx.fillStyle = '#ff00ff';
      ctx.font = 'bold 40px monospace';
      ctx.fillText('PAUSED', CANVAS_WIDTH / 2 - 80, CANVAS_HEIGHT / 2);
      ctx.font = '20px monospace';
      ctx.fillText('Press SPACE to continue', CANVAS_WIDTH / 2 - 130, CANVAS_HEIGHT / 2 + 40);
    }

    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 40px monospace';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT / 2 - 40);
      
      ctx.fillStyle = '#ff00ff';
      ctx.font = '24px monospace';
      ctx.fillText(`Final Score: ${gameState.score}`, CANVAS_WIDTH / 2 - 90, CANVAS_HEIGHT / 2);
      ctx.fillText(`MON Collected: ${gameState.monTokens}`, CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT / 2 + 30);
      
      ctx.font = '20px monospace';
      ctx.fillText('Press SPACE to restart', CANVAS_WIDTH / 2 - 120, CANVAS_HEIGHT / 2 + 70);
    }
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-neon-pink bg-black rounded-lg shadow-[0_0_20px_rgba(255,0,255,0.5)]"
        tabIndex={0}
      />
      
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Use ← → or A D to move, or drag on mobile</span>
          <span>SPACE to pause/restart</span>
          <span>Dodge ⛽ gas fees, collect 💎 MON tokens!</span>
        </div>
        
        <div className="flex gap-4 items-center">
          <button
            onClick={backgroundMusic.toggle}
            className="text-xs px-3 py-1 rounded bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition-colors"
          >
            🎵 {backgroundMusic.isPlaying ? 'Pause' : 'Play'} Music
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Volume:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={backgroundMusic.volume}
              onChange={(e) => backgroundMusic.setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
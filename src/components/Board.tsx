import type { CardType } from "../types";
import { Card } from "../components";
import { useEffect, useState, useCallback } from "react";
import { RiTimerFlashFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const GAME_CONFIG = {
  SLOTS: 16,
  INITIAL_TIME: 60,
  MAX_MISSES: 5,
  POINTS_PER_MATCH: 10,
  CARD_REVEAL_DELAY: 1000,
} as const;

type GameState = "playing" | "won" | "lost";

function getShuffledIndices(numSlots: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < numSlots / 2; i++) arr.push(i, i);
  for (let i = numSlots - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function GameOverModal({
  gameState,
  score,
  onRetry,
}: {
  gameState: GameState;
  score: number;
  onRetry: () => void;
}) {
  if (gameState === "playing") return null;

  const isWon = gameState === "won";

  return (
    <main className="absolute w-screen bg-zinc-100/80 h-screen flex justify-center items-center z-50">
      <section className="flex flex-col justify-center items-center gap-10 h-auto border border-amber-900 border-2 p-8 rounded-xl bg-amber-100/90 shadow-lg">
        <button className="cursor-pointer flex justify-end items-center w-full active:scale-95 self-end">
          <Link to="/">
            <IoMdCloseCircle size="40px" />
          </Link>
        </button>
        <section className="flex flex-col justify-center items-center gap-6">
          <h1
            className={`text-6xl ${isWon ? "text-green-600" : "text-red-600"}`}>
            {isWon ? "You Won!" : "You Lost"}
          </h1>
          <h2 className="text-2xl">Your final score is: {score}</h2>
          <button
            onClick={onRetry}
            className="cursor-pointer hover:scale-110 transition-all bg-amber-900 rounded-md p-5 text-xl text-zinc-100 active:scale-90">
            {isWon ? "Play Again" : "Retry"}
          </button>
        </section>
      </section>
    </main>
  );
}

export default function Board({ cards }: { cards: CardType[] }) {
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [cardLocations, setCardLocations] = useState<number[]>([]);
  const [time, setTime] = useState<number>(GAME_CONFIG.INITIAL_TIME);
  const [foundCards, setFoundCards] = useState<number[]>([]);
  const [stats, setStats] = useState<{ score: number; misses: number }>({
    score: 0,
    misses: 0,
  });

  const gameState: GameState =
    foundCards.length === GAME_CONFIG.SLOTS / 2
      ? "won"
      : stats.misses >= GAME_CONFIG.MAX_MISSES || time <= 0
      ? "lost"
      : "playing";

  const isGameActive = gameState === "playing";

  const resetGame = useCallback(() => {
    setOpenCards([]);
    setTime(GAME_CONFIG.INITIAL_TIME);
    setFoundCards([]);
    setStats({ score: 0, misses: 0 });
    setCardLocations(getShuffledIndices(GAME_CONFIG.SLOTS));
  }, []);

  useEffect(() => {
    setCardLocations(getShuffledIndices(GAME_CONFIG.SLOTS));
  }, []);

  useEffect(() => {
    if (!isGameActive || time <= 0) return;
    const interval = setTimeout(() => setTime((prev) => prev - 1), 1000);
    return () => clearTimeout(interval);
  }, [time, isGameActive]);

  const cardOpen = useCallback(
    (idx: number) => {
      if (!isGameActive) return;
      if (foundCards.includes(cards[cardLocations[idx]]?.id)) return;
      if (openCards.includes(idx)) return;

      if (openCards.length >= 2) {
        setOpenCards([idx]);
      } else {
        setOpenCards((curr) => [...curr, idx]);
      }
    },
    [isGameActive, foundCards, cards, cardLocations, openCards]
  );

  useEffect(() => {
    if (openCards.length !== 2) return;

    const [first, second] = openCards;
    const firstCard = cards[cardLocations[first]];
    const secondCard = cards[cardLocations[second]];

    if (firstCard?.id === secondCard?.id) {
      setStats((prev) => ({
        ...prev,
        score: prev.score + GAME_CONFIG.POINTS_PER_MATCH,
      }));
      setFoundCards((prev) => [...prev, firstCard.id]);
      setOpenCards([]);
    } else {
      setTimeout(() => {
        setOpenCards([]);
        setStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
      }, GAME_CONFIG.CARD_REVEAL_DELAY);
    }
  }, [openCards, cards, cardLocations]);

  const cardList = cardLocations.map((id, idx) => (
    <Card
      key={idx}
      card={cards[id]}
      cardOpen={cardOpen}
      idx={idx}
      openCards={openCards}
      foundCards={foundCards}
    />
  ));

  return (
    <main className="flex flex-col items-center relative">
      <GameOverModal
        gameState={gameState}
        score={stats.score}
        onRetry={resetGame}
      />

      <header className="bg-zinc-300/30 border border-zinc-900 p-5 m-5 rounded-sm flex justify-around items-center w-full max-w-4xl">
        <h4 className="text-4xl flex justify-center items-center gap-2">
          <RiTimerFlashFill /> Time: {time}s
        </h4>
        <p className="text-xl">Score: {stats.score}</p>
      </header>

      <section className="grid grid-cols-4 md:grid-cols-8 grid-rows-4 md:grid-rows-2 gap-4 m-5">
        {cardList}
      </section>

      <footer className="bg-zinc-300/30 border border-zinc-900 p-5 m-5 rounded-sm flex justify-around items-center w-full max-w-4xl">
        <span>
          Misses: {stats.misses} / {GAME_CONFIG.MAX_MISSES}
        </span>
        <span>
          Found: {foundCards.length} / {GAME_CONFIG.SLOTS / 2}
        </span>
      </footer>
    </main>
  );
}

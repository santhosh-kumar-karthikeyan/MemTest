import type { CardType } from "../types";
import { Card } from "../components";
import { useEffect, useState } from "react";
import { RiTimerFlashFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

function getShuffledIndices(numSlots: number): number[] {
  const arr: number[] = [];
  for (let i: number = 0; i < numSlots / 2; i++) arr.push(i, i);
  for (let i: number = numSlots - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Board({ cards }: { cards: CardType[] }) {
  const totalPossibleMisses: number = 5;
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [cardLocations, setCardLocations] = useState<number[]>([]);
  const [time, setTime] = useState<number>(60);
  const [foundCards, setFoundCards] = useState<number[]>([]);
  const [stats, setStats] = useState<{ score: number; misses: number }>({
    score: 0,
    misses: 0,
  });
  const numSlots: number = 16;
  function cardOpen(idx: number) {
    if (foundCards.includes(cards[cardLocations[idx]].id)) return;
    if (openCards.length >= 2) {
      setOpenCards([idx]);
    } else {
      setOpenCards((curr) => [...curr, idx]);
    }
  }
  useEffect(() => {
    if (time <= 0) return;
    const interval = setTimeout(() => setTime((prev) => prev - 1), 1000);
    return () => clearTimeout(interval);
  }, [time]);
  useEffect(() => setCardLocations(getShuffledIndices(numSlots)), []);
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
  useEffect(() => {
    if (openCards.length >= 2) {
      if (
        cards[cardLocations[openCards[0]]].id ===
        cards[cardLocations[openCards[1]]].id
      ) {
        setStats((stats) => ({ ...stats, score: stats.score + 10 }));
        setFoundCards((currCards) => [
          ...currCards,
          cards[cardLocations[openCards[0]]].id,
        ]);
      } else setStats((stats) => ({ ...stats, misses: stats.misses + 1 }));
    }
  }, [cards, cardLocations, openCards]);
  return (
    <main className="flex flex-col items-around">
      {(stats.misses >= 5 || time <= 0) && (
        <main className="absolute w-screen bg-zinc-100/80 h-screen flex justify-center items-center">
          <section className="flex flex-col justify-center items-center gap-10 h-auto border border-amber-900 border-2 p-30 rounded-xl bg-amber-100/40">
            <button className="cursor-pointer flex justify-end items-center w-full active:scale-95 ml-30">
              <Link to="/">
                <IoMdCloseCircle size={"40px"} />
              </Link>
            </button>
            <section className="flex flex-col justify-center items-center gap-10">
              <h1 className="text-6xl">You lost</h1>
              <h2 className="text-2xl">Your final score is: {stats.score}</h2>
              <button className="cursor-pointer hover:scale-110 transition-all bg-amber-900 rounded-md p-5 text-xl text-zinc-100 active:scale-90">
                Retry
              </button>
            </section>
          </section>
        </main>
      )}
      {cards.map((card) => card.id)}
      <br />
      {openCards.join(",")}
      <header className="bg-zinc-300/30 border border-zinc-900 p-5 m-5 rounded-sm flex justify-around items-center">
        <h4 className="text-4xl flex justify-center items-center space-5">
          <RiTimerFlashFill /> Time left: {time}
        </h4>
        <p className="text-xl">Score: {stats.score}</p>
      </header>
      <section className="grid md:grid-cols-8 grid-rows-2 gap-10 m-5 self-center">
        {cardList}
      </section>
      <footer className="bg-zinc-300/30 border border-zinc-900 p-5 m-5 rounded-sm flex justify-around items-center">
        Misses: {stats.misses} / {totalPossibleMisses}
      </footer>
    </main>
  );
}

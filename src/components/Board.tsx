import type { CardType } from "../types";
import { Card } from "../components";
import { useEffect, useState } from "react";

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
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [cardLocations, setCardLocations] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const numSlots: number = 16;
  function cardOpen(idx: number) {
    if (openCards.length >= 2) {
      console.table(openCards[0] ? cards[openCards[0]] : -1);
      console.table(openCards[1] ? cards[openCards[1]] : -1);
      if (cards[openCards[0]].id === cards[openCards[1]].id)
        setScore((score) => score + 12.5);
      setOpenCards([idx]);
    } else {
      if (openCards.includes(idx)) return;
      setOpenCards((curr) => [...curr, idx]);
    }
  }
  useEffect(() => setCardLocations(getShuffledIndices(numSlots)), []);
  const cardList = cardLocations.map((id, idx) => (
    <Card key={idx} card={cards[id]} cardOpen={cardOpen} idx={idx} />
  ));
  useEffect(() => console.log(openCards), [openCards]);
  return (
    <main className="flex flex-col items-around">
      {[
        openCards[0] ? cards[openCards[0]].id : -1,
        openCards[1] ? cards[openCards[1]].id : -1,
      ].join(" , ")}
      <header className="bg-zinc-300/30 border border-zinc-900 p-5 m-5 rounded-sm flex justify-around items-center">
        <h3 className="text-3xl">Memory Test</h3>
        <p className="">Score: {score}</p>
      </header>
      <section className="grid md:grid-cols-8 grid-rows-2 gap-10 m-5 self-center">
        {cardList}
      </section>
    </main>
  );
}

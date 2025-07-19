import type { CardType } from "../types";
import { Card } from "../components";
import { useState } from "react";

export default function Board({ cards }: { cards: CardType[] }) {
  function cardOpen(idx: number) {
    console.log("Open cards: ",openCards)
    if (idx in openCards)
      return
    if (openCards.length >= 2) setOpenCards([]);
    else setOpenCards((curr) => [...curr, idx]);
  }
  const [openCards, setOpenCards] = useState<number[]>([]);
  const numSlots: number = 16;
  const cardLocations: number[] = [];
  for (let i = 0; i < numSlots / 2; i++) cardLocations.push(i, i);
  for (let i = numSlots - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardLocations[i], cardLocations[j]] = [cardLocations[j], cardLocations[i]];
  }
  const cardList = cardLocations.map((id, idx) => (
    <Card key={idx} card={cards[id]} cardOpen={cardOpen} />
  ));
  return (
    <main className="grid md:grid-cols-4 grid-rows-4 gap-y-5 gap-x-1">
      {openCards}
      {cardList}
    </main>
  );
}

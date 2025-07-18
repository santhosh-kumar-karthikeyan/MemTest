import type { CardType } from "../types";
import { Card } from "../components";

export default function Board({ cards }: { cards: CardType[] }) {
  const numSlots: number = 16;
  const cardLocations: number[] = [];
  for (let i = 0; i < numSlots / 2; i++) cardLocations.push(i, i);
  console.log(cardLocations);
  for (let i = numSlots - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardLocations[i], cardLocations[j]] = [cardLocations[j], cardLocations[i]];
  }
  console.log("After shuffle: ");
  console.log(cardLocations);
  const cardList = cardLocations.map((id,idx) => (
    <Card key={idx} card={cards[id]} />
  ));
  return <main className="grid grid-cols-4 grid-rows-4">{cardList}</main>;
}

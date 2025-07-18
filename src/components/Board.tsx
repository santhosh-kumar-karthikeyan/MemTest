import type { CardType } from "../types";
import { Card } from "../components";

export default function Board({ cards }: { cards: CardType[] }) {
  const cardList = cards.map((card) => <Card key={card.id} card={card} />);
  return <main>{cardList}</main>;
}

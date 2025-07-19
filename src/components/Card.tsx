import type { CardType } from "../types";
import { idToEmoji } from "../utilities";

export default function Card({ card, cardOpen, idx}: { card: CardType, cardOpen: (idx: number) => void , idx: number}) {
  return (
    <main onClick={() => cardOpen(idx)} className="cursor-pointer aspect-[2/3] w-36 py-5 bg-gray-200/20 flex flex-col justify-end items-center space-y-15 rounded-md border border-zinc-900">
      <section className="text-5xl">
        {card.id}
        {card.id >= 0 && card.id <= idToEmoji.length ? card.emoji : "😐"}
      </section>
      <p>{card.name}</p>
    </main>
  );
}
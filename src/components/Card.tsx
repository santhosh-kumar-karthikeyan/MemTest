import type { CardType } from "../types";
import { idImgMap } from "../utilities";

export default function Card({ card }: { card: CardType }) {
  return (
    <main className="aspect-[2/3] w-36 py-5 bg-gray-200/20 m-5 flex flex-col justify-end items-center space-y-15 rounded-md border border-zinc-900">
      <section className="text-5xl">
        {card.id >= 0 && card.id <= idImgMap.length ? idImgMap[card.id] : "😐"}
      </section>
      <p>{card.name}</p>
    </main>
  );
}

import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Deck from '@/components/Deck';
import { fetchCards } from '@/lib/api';

export default async function Home() {
  const cards = await fetchCards();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center smythe-regular text-purple-300">
Thot Tarot - 3 Card Reader      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Deck initialCards={cards} />
      </Suspense>
    </div>
  );
}

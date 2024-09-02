import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Deck from '@/components/Deck';
import { fetchCards } from '@/lib/api';

export default async function Home() {
  const cards = await fetchCards();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center smythe-regular text-purple-300">
      Tarô de Thot - Tiragem das 3 cartas</h1>
      <h3 className=' text-purple-300 old-standard-tt-bold'>Obs: Utilizar em telas com largura acima de 950px</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <Deck initialCards={cards} />
      </Suspense>
    </div>
  );
}

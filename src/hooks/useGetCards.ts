// src/hooks/useFetchCard.ts

import { useQuery } from '@tanstack/react-query';
import { fetchCardById } from '@/lib/api'; 

export const useFetchCard = (id: string | null) => {
    return useQuery({
      queryKey: ['card', id],
      queryFn: async () => {
        console.log("Fetching card with ID:", id); // Log the ID
        const card = await fetchCardById(id);
        console.log("Fetched card data:", card); // Log the fetched data
        return card;
      },
      enabled: !!id, 
    });
  };
  
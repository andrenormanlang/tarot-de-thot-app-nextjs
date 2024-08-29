export async function fetchCards() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/cartas`);



  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }
  
  return response.json();

  
}

export async function generateReading(cardIds: number[]) {
  const response = await fetch('/api/reading', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardIds }),
  })
  if (!response.ok) {
    throw new Error('Failed to generate reading')
  }
  return response.json()
}
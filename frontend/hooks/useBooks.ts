import { useQuery } from '@tanstack/react-query';
import { Book } from '../../types/Book';

async function fetchBooks(): Promise<Book[]> {
  const response = await fetch('http://localhost:4000/api/books');
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
}

export function useBooks() {
  const { data: books = [], isLoading: loading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  return { books, loading, error: error ? (error as Error).message : null };
}
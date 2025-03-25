import express from 'express';
import supabase from '../config/SupabaseConfig';
import { cacheData, getCachedData } from '../utils/caching';

const router = express.Router();

// GET /api/books
router.get('/', async (req: any, res: any) => {
  try {
    // Check cache first
    const cachedBooks = await getCachedData('books');
    if (cachedBooks) {
      return res.json(cachedBooks);
    }

    // If not in cache, fetch from Supabase
    const { data, error } = await supabase
      .from('Book')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    // Cache the result
    await cacheData('books', data, 300); // Cache for 5 minutes
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch books', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;
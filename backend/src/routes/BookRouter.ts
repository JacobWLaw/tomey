import express from 'express';
import supabase from '../config/SupabaseConfig';

const router = express.Router();

// GET /api/books
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Book')
      .select('*');
    
    if (error) {
      throw error;
    }
    
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
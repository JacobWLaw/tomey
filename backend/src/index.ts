import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import BookRouter from './routes/BookRouter'
import supabase from './config/SupabaseConfig';

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route to check if Supabase connection works
app.get('/api/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase.from('Book').select('*').limit(1);
    
    if (error) {
      console.error('Supabase test error:', error);
      throw error;
    }
    
    console.log('Supabase test successful:', data);
    res.json({ 
      success: true, 
      message: 'Supabase connection successful', 
      data 
    });
  } catch (error) {
    console.error('Test route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to Supabase', 
      error: error instanceof Error ? error.message : JSON.stringify(error)
    });
  }
});

// Routes
app.use('/api/books', BookRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
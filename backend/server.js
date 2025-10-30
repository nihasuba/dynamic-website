import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import componentRoutes from './routes/components.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


app.use('/api/components', componentRoutes);


app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend server is running',
    timestamp: new Date().toISOString(),
  });
});


app.get('/', (req, res) => {
  res.json({
    message: 'Dashboard Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      components: {
        get: 'GET /api/components',
        post: 'POST /api/components',
        delete: 'DELETE /api/components',
      },
    },
  });
});


app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path,
  });
});


app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n Server started successfully!');
});

export default app;

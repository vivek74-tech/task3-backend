import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import taskRoutes from './routes/taskRoutes.js';
import { authenticateApiKey } from './middleware/security.js';
import dotenv from "dotenv"
const app = express();
dotenv.config()
const PORT = process.env.PORT || 3000;

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Welcome to Task 3 REST API' });
});

// Protected API Routes
app.use('/api/tasks', authenticateApiKey, taskRoutes);

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
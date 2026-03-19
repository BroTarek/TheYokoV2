import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from "express-rate-limit";
import dotenv from 'dotenv';

import mountRoutes from './Routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['https://the-yoko-v2-1a1o.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.set('trust proxy', 1);
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: 100,               // 100 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false
}));

// API Routes
mountRoutes(app);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("GLOBAL ERROR:", err);
    res.status(500).json({
        message: err.message,
        detail: err.detail,
        code: err.code,
        stack: err.stack,
        postgresError: err
    });
});

app.listen(port, () => {
    console.log(`🚀 Recruitment Agency Backend running on port ${port}`);
});

export default app;

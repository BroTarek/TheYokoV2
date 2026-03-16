import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as schema from './Domain/Schemas/index';
import ws from 'ws';

// Neon requires WebSocket for Node.js environments
neonConfig.webSocketConstructor = ws;

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Neon serverless tuning
    max: 20,
    idleTimeoutMillis: 30_000,       // keep idle connections alive longer
    connectionTimeoutMillis: 30_000, // allow 30s for Neon cold-start wake-up
});

// Prevent unhandled pool errors from crashing the server
pool.on('error', (err:any) => {
    console.error('[DB Pool Error]', err.message);
});

export const db = drizzle({ client: pool, schema });


// import mysql from 'mysql2/promise';

// // بررسی اینکه آیا pool از قبل وجود دارد یا خیر (برای جلوگیری از ساخت مجدد در Hot Reload)
// let cachedPool = globalThis._mysqlPool || null;

// export async function getDbPool() {
//   if (!cachedPool) {
//     cachedPool = mysql.createPool({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME ,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//     });

//     cachedPool.on('error', (err) => {
//       console.error('❌ Database pool error:', err);
//       if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         console.error('⚠️ Connection lost. The pool may be re-created.');
//       }
//     });

//     console.log('✅ MySQL connection pool created.');

//     // کش کردن روی global تا در hot‑reload دوباره ساخته نشود
//     globalThis._mysqlPool = cachedPool;
//   }

//   return cachedPool;
// }


import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase server environment variables are missing.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
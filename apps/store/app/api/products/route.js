import { supabase } from "../../../lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase
      .from('products')
      .select('*');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);

      return Response.json(
        { message: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);

    return Response.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// import { getDbPool } from '../../../lib/db'; 

// export async function GET(request) {
//   try {
//     console.log('🔹 Preparing database connection from pool...');
//     const pool = await getDbPool(); // global singleton pool از lib/db

//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get("category");
//     let rows;

//     if (category) {
//       [rows] = await pool.query(
//         'SELECT * FROM product WHERE category = ?',
//         [category] // پارامتر امن
//       );
//     } else {
//       [rows] = await pool.query('SELECT * FROM product');
//     }

//     console.log(`✅ Query executed successfully. Returned ${rows.length} rows.`);

//     return new Response(JSON.stringify(rows), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });

//   } catch (error) {
//     console.error('❌ Database error:', error);

//     return new Response(
//       JSON.stringify({
//         message: 'Failed to fetch products',
//         error: error.message,
//       }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }


// // مثال برای API Route
// import getDbPool  from '../../../lib/db';

// export default async function handler(req, res) {
//   try {
//     const [rows] = await db.execute('SELECT * FROM product');
//     res.status(200).json(rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// import mysql from 'mysql2/promise';

// این تابع می‌تواند مستقیماً در Server Component فراخوانی شود
// یا یک تابع جداگانه باشد که از آن فراخوانی می‌کنید.
// const pool = getDbPool();

// export default async function handler(req, res) {
//   // اطمینان حاصل کنید که درخواست از نوع GET است (برای مثال)
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   let connection; // تعریف connection در اینجا برای دسترسی در finally

//   try {
//     // دریافت یک اتصال از pool
//     connection = await pool.getConnection();
//     console.log("Connection obtained from pool for API route."); // برای دیباگ

//     // اجرای کوئری با استفاده از اتصال گرفته شده
//     const [rows] = await connection.execute('SELECT * FROM product');
//     console.log("Query executed successfully. Rows:", rows);

//     // ارسال پاسخ موفقیت‌آمیز
//     res.status(200).json(rows);

//   } catch (error) {
//     console.error('Database connection or query error in API route:', error);

//     // مدیریت خطاهای خاص
//     if (error.code === 'PROTOCOL_CONNECTION_LOST') {
//       console.error('DATABASE CONNECTION LOST - Pool might need to be recreated.');
//       // در سناریوهای پیشرفته‌تر، ممکن است بخواهید pool را اینجا دوباره بسازید
//       // یا منطق مدیریت خطا را پیچیده‌تر کنید.
//     }

//     // ارسال پاسخ خطا
//     res.status(500).json({ message: 'Failed to fetch products', error: error.message });

//   } finally {
//     // **بسیار مهم:** اتصال را به pool برگردانید، نه اینکه ببندید!
//     // اطمینان حاصل کنید که connection تعریف شده باشد قبل از release
//     if (connection) {
//       connection.release();
//       console.log("Connection released back to the pool from API route."); // برای دیباگ
//     }
//   }
//   // توجه: در اینجا connection.end() یا pool.end() را فراخوانی نمی‌کنیم.
//   // Pool خود مدیریت اتصالات را در طول عمر برنامه انجام می‌دهد.
// }


// import { NextResponse } from "next/server";

// import { connectDB } from "../../../lib/mongodb";
// import Product from "../../../modals/Product";


// export const revalidate = 60;

// /* ---------- helpers ---------- */

// const APIS = [
//   {
//     name: "dummyjson-smartphones",
//     url: "https://dummyjson.com/products/category/smartphones",
//     pick: (d) => d.products,
//   },
//   {
//     name: "fakestoreapi",
//     url: "https://fakestoreapi.com/products?limit=8",
//     pick: (d) => d,
//   },
// ];

// const normalize = (p, source) => ({
//   id: p.id,
//   title: p.title,
//   price: p.price,
//   description: p.description || "",
//   category: p.category || "",
//   image: p.image || p.thumbnail || (Array.isArray(p.images) ? p.images[0] : ""),
//   rating: p.rating || { rate: 0, count: 0 },
//   _source: source,
//   _fetchedAt: new Date().toISOString(),
// });

// async function fetchWithTimeout(url, ms = 5000) {
//   const controller = new AbortController();
//   const timer = setTimeout(() => controller.abort(), ms);

//   const res = await fetch(url, {
//     signal: controller.signal,
//     headers: { Accept: "application/json" },
//   });

//   clearTimeout(timer);
//   if (!res.ok) throw new Error("Fetch failed");
//   return res.json();
// }

/* ---------- handler ---------- */

// export async function GET() {
//           console.log('hello')

//     try {
//       await connectedToDatabase()
//       const products = await Product2.find({})
//       console.log('p '+products)
//       return NextResponse.json(products,{status:200})
//     } catch (error) {
//               console.log('hello')

//       return NextResponse.json({error:"خطا در دریافت محصولات"},{status:500})
//     }
//   }


// import mongoose from "mongoose"; // اضافه کن


// export async function GET() {
//   try {
//     // اتصال به DB
//     await connectDB(); // این async است و منتظر می‌ماند

//     // مطمئن شو connection واقعاً open شده
//     if (mongoose.connection.readyState !== 1) {
//       await new Promise((resolve, reject) => {
//         mongoose.connection.once("open", resolve);
//         mongoose.connection.once("error", reject);
//       });
//     }

//     // اطلاعات DB و Collections
//     console.log("DB:", mongoose.connection.name);
//     const collections = await mongoose.connection.db.listCollections().toArray();
//     console.log("Collections:", collections);

//     // داده‌ها (اختیاری)
//     const products = await Product.find({}).lean();

//     return NextResponse.json({
//       db: mongoose.connection.name,
//       collections,
//       products,
//     });
//   } catch (error) {
//     console.error("API /products error:", error);
//     return NextResponse.json(
//       { error: "خطا در دریافت اطلاعات" },
//       { status: 500 }
//     );
//   }
// }


// export async function GET() {
//   try {
//     await connectDB();
//     const products = await Product.find({}).lean();
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error("API /products error:", error);
//     return NextResponse.json(
//       { error: "خطا در دریافت محصولات" },
//       { status: 500 }
//     );
//   }
// }


// /* ---------- fallback ---------- */

// function getFallbackProducts() {
//   return [
//     {
//       id: 1,
//       title: "Premium Backpack",
//       price: 49.99,
//       description: "Water-resistant backpack with laptop compartment",
//       category: "men's clothing",
//       image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
//       rating: { rate: 4.5, count: 120 },
//       _source: "fallback",
//       _fetchedAt: new Date().toISOString(),
//     },
//     {
//       id: 2,
//       title: "Casual Cotton T-Shirt",
//       price: 22.99,
//       description: "Soft 100% cotton t-shirt",
//       category: "men's clothing",
//       image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
//       rating: { rate: 4.2, count: 89 },
//       _source: "fallback",
//       _fetchedAt: new Date().toISOString(),
//     },
//   ];
// }

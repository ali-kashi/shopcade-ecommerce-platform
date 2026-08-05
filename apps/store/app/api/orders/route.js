
//         const pool = await getDbPool();
//         // برای هر آیتم در سبد خرید یک رکورد ثبت کن
//         for (const item of cart) {
//             await pool.query(
//                 `INSERT INTO orders 
//                 (name, email, country, city, address, postalCode, 
//                  pId, pTitle, price, quantity, img, totalPrice)
//                 VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
//                 [
//                     name,
//                     email,
//                     country,
//                     city,
//                     address,
//                     postalCode,
//                     item.id,        // مطمئن شو اسم فیلد درست است
//                     item.title,
//                     item.price,
//                     item.quantity,
//                     item.image,
//                     totalPrice
//                 ]
//             );
//         }

import { NextResponse } from "next/server";
import { supabase } from "../../../lib/db";

export async function POST(req) {
  try {
    const { user, cart, totalPrice } = await req.json();

    if (!user || !cart || cart.length === 0) {
      return NextResponse.json(
        { message: "اطلاعات سفارش ناقص است" },
        { status: 400 }
      );
    }

    const { name, email, country, city, address, postalCode } = user;

    // مرحله 1: ثبت سفارش اصلی در جدول orders
    const { data: orderInsert, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          name,
          email,
          country,
          city,
          address,
          postalCode,
          totalPrice,
          status: "pending",
        },
      ])
      .select("id") // گرفتن آیدی سفارش ثبت شده
      .maybeSingle();

    if (orderError || !orderInsert) {
      console.error("❌ ORDER INSERT ERROR:", orderError?.message);
      return NextResponse.json(
        { message: "خطا در ثبت سفارش", error: orderError?.message },
        { status: 500 }
      );
    }

    const orderId = orderInsert.id;

    // مرحله 2: ثبت آیتم‌های سفارش در order_items به صورت bulk
    const itemsToInsert = cart.map((item) => ({
      oId: orderId,
      pId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      img: item.image,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsError) {
      // اگر خطا داشت، سفارش اصلی را هم حذف کن برای تمیزی (شبیه rollback ساده)
      await supabase.from("orders").delete().eq("id", orderId);
      console.error("❌ ORDER ITEMS INSERT ERROR:", itemsError.message);
      return NextResponse.json(
        { message: "خطا در ثبت آیتم‌های سفارش", error: itemsError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "سفارش با موفقیت ثبت شد",
        orderId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ ORDER SAVE GENERAL ERROR:", error?.message);
    return NextResponse.json(
      { message: "خطا در ثبت سفارش", error: error?.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/db';

export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items!oId (
          title,
          quantity
        )
      `);

    if (error) {
      console.error('❌ Supabase Error:', error);
      return NextResponse.json({ 
        message: 'Failed to fetch orders', 
        error: error.message 
      }, { status: 500 });
    }

    // بازگرداندن لیست سفارش‌ها (حتی اگر خالی باشد، آرایه خالی برمی‌گرداند)
    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    console.error('❌ Unexpected Error:', error);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      error: error.message 
    }, { status: 500 });
  }
}

import { supabase } from "../../../../lib/db";
import { NextResponse } from 'next/server'; // حتما این را اضافه کنید

export async function GET(req, { params }) {
  try {
    // در Next.js 15 حتما باید await شود
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle(); // استفاده از maybeSingle برای دریافت یک آبجکت به جای آرایه

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // بازگرداندن خودِ محصول
    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("❌ Critical Server Error:", error);
    // اصلاح شده: ارسال پاسخ JSON معتبر در صورت بروز خطای غیرمنتظره
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req,{params}){
    try {
        const {id} = await params
        
        const {error } = await supabase
        .from('products') 
        .delete()
        .eq('id', id)
  
      // ۴. مدیریت خطاها
      if (error) {
        console.error("Supabase Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
      // ۵. پاسخ موفقیت‌آمیز
      return NextResponse.json({ message: 'Product delete successfully'}, { status: 200 });
    
      } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      }
}


export async function PUT(req, { params }) {
  try {
    // ۱. دریافت ID از پارامترها
    const { id } = await params;
    
    // ۲. دریافت بدنه درخواست
    const data = await req.json();
    const { title, price, description, image, category } = data;

    // ۳. ارسال دستور آپدیت به Supabase
    // .from('table_name') -> نام جدول خود را جایگزین کنید (مثلاً 'products')
    const {error } = await supabase
      .from('products') 
      .update({
        title,
        price,
        description,
        image,
        category
      })
      .eq('id', id)

    // ۴. مدیریت خطاها
    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    // ۵. پاسخ موفقیت‌آمیز
    return NextResponse.json({ message: 'Product updated successfully'}, { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

import { supabase } from "../../../lib/db";

export async function GET() {
  try {
    const { data:products, error } = await supabase
    .from('products')
    .select('*');

    if (error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    
    if (!products) {
      return Response.json({ message: 'Products not found' }, { status: 404 });
    }
    
    return Response.json(products, { status: 200 });
    
    
      } catch (error) {
        console.error("❌ Error:", error);
        return new Response(
          JSON.stringify({ message: "Internal Server Error" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
   
export async function POST(req) {
  try {
    let {title, price, description, image, category} = await req.json();
    price = Number(price);
    
     await supabase
      .from("products")
      .insert([
        {
          title, price, description, image, category,
        },
      ])

      // if (error) {
      //   console.error("❌ product INSERT ERROR:", error?.message);
      //   return NextResponse.json(
      //     { message: "خطا در ثبت محصول", error: error?.message },
      //     { status: 500 }
      //   );
      // }

    // اصلاح شده: به جای rows، یک آبجکت حاوی پیام موفقیت بفرستید
    return new Response(
      JSON.stringify({ message: 'Product added successfully' }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Database error:', error);

    return new Response(
      JSON.stringify({
        message: 'Failed to add product', // متن خطا را مناسب‌تر تغییر دادم
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

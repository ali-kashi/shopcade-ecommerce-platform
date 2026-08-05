import { supabase } from "../../../../lib/db";

// در Next.js 15+، پارامترهای مسیر به صورت Promise هستند
export async function GET(request, { params }) {
  try {
    // چون params یک Promise است، باید آن را await کنید
    const resolvedParams = await params;
    const { id } = resolvedParams;

    console.log("🔹 Received params:", id);

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Product ID is missing." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return new Response(
        JSON.stringify({ message: "Invalid product id format. ID must be a number." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    
// دریافت محصول بر اساس id
// در فایل route.js سمت API
const { data: product, error } = await supabase
  .from('products') // مطمئن شوید نام درست است
  .select('*')
  .eq('id', productId)
  .maybeSingle();

if (error) {
  return Response.json({ message: error.message }, { status: 500 });
}

if (!product) {
  return Response.json({ message: 'Product not found' }, { status: 404 });
}

return Response.json(product, { status: 200 });


  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


// import { NextResponse } from "next/server";
// import { connectDB } from "../../../../lib/mongodb";
// import Product from "../../../../modals/Product";

// export async function GET(req,{params}) {
//   try {
//     await connectDB();
//     const {id} = await params
//     const product = await Product.findOne({_id:id});
//     return NextResponse.json(product,{status:200});
//   } catch (error) {
//     return NextResponse.json(
//       { error: error},
//       { status: 500 }
//     );
//   }
// }


// export async function GET(_, { params }) {
//   const { id } = await params;

//   try {
//     const res = await fetch(
//       `https://dummyjson.com/products/${id}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) {
//       return Response.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     const p = await res.json();

//     const product = {
//       id: p.id,
//       title: p.title,
//       price: p.price,
//       description: p.description || "",
//       category: p.category || "",
//       image: p.thumbnail || p.images?.[0] || "",
//       rating: p.rating || { rate: 0, count: 0 },
//     };

//     return Response.json(product);
//   } catch (err) {
//     return Response.json(
//       { message: "Product not found" },
//       { status: 404 }
//     );
//   }
// }

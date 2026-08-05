import ProductsList from "./ProductsList";

async function getProducts(category) {
  console.log("searchParams:"+ category)
    const baseUrl = process.env.API_BASE_URL; // ← تغییر داده شده

    if (!baseUrl) {
        console.error("❌ API_BASE_URL is not defined");
        return [];
    }

    const url = category ? 
    `${baseUrl}/api/products?category=${category}`:
    `${baseUrl}/api/products`

    try {
        const res = await fetch(url, {
        next: { revalidate: 60 }, // ISR
        });

        if (!res.ok) throw new Error(`API failed: ${res.status}`);

        return await res.json();
    } catch (err) {
        console.error("❌ Home fetch error:", err.message);
        return [];
    }
}

export default async function LatesProducts({searchParams}){
    const resolvedSearchParams = await searchParams;
    const category = resolvedSearchParams?.category
    const products = await getProducts(category);
    return(
        <div className="new-products">
            <h2 className="title">{category ? `محصولات ${category}`: 'محصولات پرفروش'}</h2>
            <ProductsList products={products} />
        </div>
    )
}
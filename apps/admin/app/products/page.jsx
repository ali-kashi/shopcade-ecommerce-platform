import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

async function getProducts() {
    const baseUrl = process.env.API_BASE_URL; // ← تغییر داده شده

    if (!baseUrl) {
        console.error("❌ API_BASE_URL is not defined");
        return [];
    }

    const url = `${baseUrl}/api/products`

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

export default async function Product() {
    const products = await getProducts();
  return (
    <>
    <div>this product page</div>
    <Link href="/products/new">
        <button>Add New Product</button>
    </Link>
    <table>
      <thead>
        <tr>
          <th>نام محصول</th>
          <th>عملیات</th>
        </tr>
      </thead>

      <tbody>
        {
          products.map(product=>(
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>
                <Link href={`products/edit/${product.id}`}><FiEdit/></Link>
                <Link href={`products/delete/${product.id}`}><FiTrash2/></Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </>
  );
}

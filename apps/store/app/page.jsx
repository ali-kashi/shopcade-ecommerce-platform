import HeroSection from "../components/HeroSection";
import LatesProducts from "../components/LatesProducts";
import { getProduct } from "./api/products/route";

export function generateMetadata() {
  return {
    title: "Home | Your online shop",
    description: "Browse amazing products...",
    openGraph: {
      title: "Home | Your online shop social media",
      description: "Browse amazing products social media",
    },
  };
}

export default async function Home() {
  let products = [];
  let errorMessage = null;

  const baseUrl = process.env.API_BASE_URL
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    errorMessage = `Failed to load products: Status: ${res.status}`;
  } else {
    products = await res.json();
  }
  return (
    <div className="home">
      <HeroSection />
        {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}
        {products && products.length > 0 
        ? <LatesProducts products={products} /> 
        : !errorMessage && <p>No products found.</p> }
    </div>
  );
}

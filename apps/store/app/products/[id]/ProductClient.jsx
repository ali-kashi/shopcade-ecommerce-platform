"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContexts } from "../../../contexts/CartContexts";
import { enTofa } from "../../../utils/Utilities";


export default function ProductClient({ product }) {
  const { addToCart } = useContext(CartContexts);

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <div className="new-product-image">
          <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="new-product-info">
          <h1 className="new-product-title">{product.title}</h1>
          <span>دسته بندی: </span>
          <Link href={`/products?category=${product.category}`}>{product.category}</Link>
          <p className="new-product-description">{product.description}</p>
          {product.rating && <p>⭐ {product.rating.rate}</p>}
          <div className="product-price-row">
          <div className="product-price">{enTofa(product.price)}</div>
          <button className="product-button"
            onClick={() => {
            addToCart(product);
            alert(`product add ${product.title}`);
            }}>
            اضافه به سبد خرید
          </button>
        </div>
        </div>
      <Link href="/">Back to shop</Link>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useContext } from "react";
import { CartContexts } from "../contexts/CartContexts";
import Image from "next/image";
import { enTofa } from "../utils/Utilities";

export default function ProductBox({product}){
    let {addToCart} = useContext(CartContexts)
    let context = useContext(CartContexts);
console.log("CartContexts in Cart.jsx:", product.img);

    return(
        <div className="product-wrapper">
            <div className="product-image-box">
                <Link href={`products/${product.id}`}>
                    <Image width={150} height={150} src={product.image} alt={product.title} />
                </Link>
            </div>
            <div className="product-info-box">
                <Link href={`products/${product.id}`}>
                    <div className="product-title">{product.title}</div>
                </Link>
                <div className="product-price-row">
                    <button className="product-button" onClick={
                        ()=>{addToCart(product)
                        alert("product add "+ product.title)
                    }}>افزودن به سبد خرید</button>
                    <div className="prodcut-price">{enTofa(product.price)}</div>
                </div>
            </div>
               
        </div>
    )
}
"use client"

import { useParams, useRouter } from "next/navigation"

export default function DeleteProdouct(){
    const router = useRouter()

    const {id} = useParams() // در یوز کلاینت از این استفاده می کنیم

    async function handleClick(){
        const res = await fetch(`/api/products/${id}`,{
            method: "DELETE"
        })
        if(res.ok)
            router.push("/products")
    }

    return(
        <>
            <h1>آیا واقعا می خواهید محصول را حذف کنید..؟</h1>
            <button className="btn-m" onClick={handleClick}>بله، حذف کن</button>
            <button className="btn-m" onClick={()=>router.push("/products")}>انصراف</button>
        </>
    )
}
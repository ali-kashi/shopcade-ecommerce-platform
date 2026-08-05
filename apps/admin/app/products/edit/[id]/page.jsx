"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditProduct(){
    const[formData,setFormData]= useState({
    title:"",
    price:"",
    image:"",
    description:"",
    category:"لپتاپ"
    })
    const {id} = useParams()
    const router = useRouter()

    useEffect(
        ()=>{
            async function fetchProduct() {
                const res = await fetch(`/api/products/${id}`)
                const data = await res.json();
                setFormData(data);  
            }
            fetchProduct()
        }
    ,[id]) 

    function handleChange(e){
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        const res = await fetch(`/api/products/${id}`,{
        method: "PUT",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(formData)
        })
        if(res.ok){
            router.push("/products")
        }
        else{
            alert("خطا در ویرایش سفارش")

        }
    }
    return(
        <>
        <h1>ویرایش محصولات</h1>
        <form onSubmit={handleSubmit}>
                <input value={formData.title  || ""} onChange={handleChange} type="text" name="title" placeholder="نام" />
                <input value={formData.price  || ""} onChange={handleChange} type="number" name="price" placeholder="قیمت" />
                <input value={formData.image  || ""} onChange={handleChange} type="text" name="image" placeholder="تصویر" />
                <textarea value={formData.description  || ""} onChange={handleChange} name="description" placeholder="توضیحات"></textarea>
                <select value={formData.category  || "لپتاپ"} onChange={handleChange} name="category">
                    <option value="لپتاپ">لپتاپ</option>
                    <option value="موبایل">موبایل</option>
                    <option value="تبلت">تبلت</option>
                </select>
                <button type="submit">ویرایش</button>
            </form>
        </>
    )
}
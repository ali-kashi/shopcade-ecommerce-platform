"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewProdoct(){
    const[formData,setFormData]= useState({
        title:"",
        price:"",
        image:"",
        description:"",
        category:"لپتاپ"
    })

    function handleChange(e){
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const router = useRouter()

    async function handleSubmit(e){
        e.preventDefault()
        const res = await fetch(`/api/products`,{
        method: "POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(formData)
        })
        if(res.ok){
            router.push("/products")
        }
        else{
            alert("خطا در ثبت محصول")

        }
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="title" placeholder="نام" />
                <input onChange={handleChange} type="number" name="price" placeholder="قیمت" />
                <input onChange={handleChange} type="text" name="image" placeholder="تصویر" />
                <textarea onChange={handleChange} name="description" placeholder="توضیحات"></textarea>
                <select onChange={handleChange} name="category">
                    <option value="لپتاپ">لپتاپ</option>
                    <option value="موبایل">موبایل</option>
                    <option value="تبلت">تبلت</option>
                </select>
                <button type="submit">ذخیره دکمه</button>
            </form>
        </>
    )
}
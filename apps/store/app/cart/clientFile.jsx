"use client";
import { useContext, useState } from "react"
import Image from "next/image";
import { enTofa } from "../../utils/Utilities";
import { CartContexts } from "../../contexts/CartContexts";

export default function ClientFile()
{

     let {cart, removeFromCart, updateQuantity, getTotal,clearCart} = useContext(CartContexts)

     const [userInfo,setUserInfo] = useState({
        name : "",
        email : "",
        country : "",
        city : "",
        address : "",
        postalCode : ""
     })

     function handleChange(e){
        setUserInfo({...userInfo,[e.target.name]: e.target.value})
        //در جاوا اسکریپت مدرن (ES6 به بعد)، شما می‌توانید از براکت [] برای تعیین نام یک ویژگی (property) در یک شیء (object) استفاده کنید.     }
     }
     async function handleSubmit(e){
        e.preventDefault()
        const orderData = {
            user :userInfo,
            cart,
            totalPrice :getTotal()
        }
        try{
            const res = await fetch(`/api/orders`,{
                method: "POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(orderData)
            })
            if(res.ok){
                alert("سفارش شما ثبت شد")
                clearCart()
                setUserInfo({name : "",email : "",country : "",city : "",address : "",postalCode : ""})
            }
            else{
                alert("خطا در ثبت سفارش")

            }
        }
        catch(error){
            alert("مشکلی پیش  آمده")
        }
     }
     

    return(
        <div className="cart-grid">
            <div className="cart-box">
                <h2>سبد خرید</h2>
                {cart.length==0 && <div>سبد خرید خالی است</div>}
                {cart.length>0 && (
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>کالا</th>
                                <th>قیمت</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                cart.map(
                                    (product)=>(
                                        <tr key={product.id}>
                                            <td className="cart-product">
                                                <Image src={product.image} width={80} height={80}
                                                alt={product.title}
                                                className="cart-product-image"/>
                                                {product.title}
                                                
                                                <input type="number" value={product.quantity}
                                                min="1"
                                                onChange={()=>updateQuantity(product.id, Number(event.target.value))}
                                                />
                                                <button onClick={ ()=>{removeFromCart(product.id)} }>حذف</button>
                                            </td>
                                            {/* <td>
                                                <input name="" type="number" value={product.quantity}
                                                min="1"
                                                onChange={()=>updateQuantity(product.id, Number(event.target.value))}
                                                />
                                            </td> */}
                                            <td>
                                                {enTofa(product.price)}
                                            </td>
                                            {/* <td>
                                                <button onClick={ ()=>{removeFromCart(product.id)} }>حذف</button>
                                            </td> */}
                                        </tr>
                                    )
                                )
                            }
                            <tr>
                                <td>مجموع</td>
                                <td>{enTofa(getTotal().toFixed(2))}</td>
                            </tr>
                        </tbody>
                    </table>
                )
                }
            </div>
            {
                cart.length > 0 && (
                    <div className="cart-box">
                        <h2 className="cart-title">اطلاعات شما</h2>
                        <form className="cart-form" action="" onSubmit={handleSubmit}>
                            <input value={userInfo.name}  onChange={handleChange} name="name" type="text" className="cart-input" placeholder="نام" />
                            <input value={userInfo.email} onChange={handleChange} name="email" type="email" className="cart-input" placeholder="ایمیل" />
                            <input value={userInfo.country} onChange={handleChange} name="country" type="text" className="cart-input" placeholder="کشور" />
                            <input value={userInfo.city} onChange={handleChange} name="city" type="text" className="cart-input" placeholder="شهر" />
                            <input value={userInfo.address} onChange={handleChange} name="address" type="text" className="cart-input" placeholder="آدرس" />
                            <input value={userInfo.postalCode} onChange={handleChange} name="postalCode" type="number" className="cart-input" placeholder="کدپستی" />
                            <button className="cart-button">پرداخت آنلاین</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
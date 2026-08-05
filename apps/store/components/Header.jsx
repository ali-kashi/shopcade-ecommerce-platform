"use client"
import Image from "next/image";
import { useSession,signIn,signOut } from "next-auth/react"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import BarsIcon from "./icons/Bars";
import { CartContexts } from "../contexts/CartContexts";
import { enTofa } from "../utils/Utilities";

export default function Header(){
    const {data: session} = useSession()
    const [isRender,setIsRender] = useState(false)
    const [isActiveMobile,setIsActiveMobile] = useState(false)
    let {cart} = useContext(CartContexts)

    useEffect(
        ()=> setIsRender(true)
        ,[])

    if(!isRender)
        return null

    return(
        <header className="header">
            <div className="header-wrapper">
                {
                    session?(
                    <>
                    <span>Hi {session.user.name}</span>
                    <button onClick={()=>signOut()}>signOut</button>
                    </>
                ):
                <button onClick={()=>signIn()}>signIn</button>
            }
                
                <nav className={`nav ${isActiveMobile? "active" : ""}`}>
                    <Link className="nav-link" href={"/"}>صفحه اصلی</Link>
                    <Link className="nav-link" href={"/products"}>محصولات</Link>
                    <Link className="nav-link" href={"/cart"}>سبد خرید</Link>
                    {cart.length > 0 ? <span className="nav-link">{enTofa(cart.length)}</span> : ""}
                </nav>
{/* 
                <Link className="logo" href={"/"}>
                    <Image src="/images/logo.jpg" alt="logo" width={120} height={60} />
                </Link> */}

                <button className="nav-button" onClick={()=>setIsActiveMobile((prev)=>!prev)}>
                    <BarsIcon/>
                </button>
            </div>
        </header>
    )
}
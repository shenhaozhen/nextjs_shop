"use client"
import { useBoundStore } from "@/util/zustand/store";
import { useState, useEffect } from "react";

export default function ShoppingCart() {

    const shopping_cart = useBoundStore((state) => state.shopping_cart)
    const add = useBoundStore((state) => state.addItem)
    const remove = useBoundStore((state) => state.removeItem)
    const clear  = useBoundStore((state) => state.clearCart)

    console.log(shopping_cart)

    const shoppingCartItem = shopping_cart.map((item) => {

        return (
            <div key={item.name + item.price} className="flex flex-row gap-[1vw]">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
            </div>
        )
    })


    return (
    <div className="w-full min-h-screen flex flex-row justify-center items-center text-white" style={{backgroundImage: "url('/acg5.jpeg')"}}>
        <div className="w-[80%] h-[85vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-lg">
            {shoppingCartItem}
        </div>
    </div>
    );
}
"use client"
import Product from "@/components/Product";
import { useBoundStore } from "@/util/zustand/store";

const fakeProductsData = [
    {
        name: 'coke',
        price: 2.9,
        stock: 20,
        seller: '1242419350@qq.com',
        imgSrc: '/coke.jpeg'
    },
    {
        name: 'sprite',
        price: 2.3,
        stock: 15,
        seller: '1242419350@qq.com',
        imgSrc: '/sprite.jpeg'
    },
    {
        name: 'iced tea',
        price: 2.3,
        stock: 30,
        seller: '1242419350@qq.com',
        imgSrc: '/iced_tea.jpg'
    },
    {
        name: 'coffee',
        price: 5.0,
        stock: 25,
        seller: '1242419350@qq.com',
        imgSrc: '/coffee.jpeg'

     },
     {
        name: 't-shirt',
        price: 30.0,
        stock: 20,
        seller: '1242419350@qq.com',
        imgSrc: '/t-shirt.jpeg'
     }
]

// need a function to update the products
export default function Shop() {

    const shopping_cart = useBoundStore((state) => state.shopping_cart);
    const addToCart = useBoundStore((state) => state.addItem);
    const removeFromCart = useBoundStore((state) => state.removeItem);

    const products = fakeProductsData.map((product, index) => {

        let quantity = shopping_cart.find((item) => item.name === product.name)?.quantity || 0;

        return <Product key={index} {...product} handleAdd={addToCart} handleRemove={removeFromCart} quantity={quantity}/>;
    });

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center text-white" style={{backgroundImage: "url(/acg4.jpeg)"}}>
            
            <div className="w-[90%] h-[90vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-md flex flex-row justify-start items-center flex-wrap pl-[10vw] gap-x-[100px] relative">
                <p className="absolute top-0 left-0">Click the image for more details of each item</p>
                {products}
            </div>
        </div>
    );
}
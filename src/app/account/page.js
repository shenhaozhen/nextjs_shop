"use client"
import { createClient } from "@/util/supabase/client";
import { useState, useEffect, useRef } from "react";

const item = {
    id: 1,
    name: 'coke',
    price: 2.0,
    image: "",
    stock: 10,
    seller : "shz1995@live.com"
}

export default function Account() {
   
    const supabase = createClient();
    const [currentUser, setCurrentUser] = useState(null);

    const avatarRef = useRef(null);
    const avatarUploaderRef = useRef(null);
    const productImgRef = useRef(null);
    const productImgUploaderRef = useRef(null);

    const [avatar, setAvatar] = useState(null);
    const [productImg, setProductImg] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");

    useEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            console.log(user)
            setCurrentUser(user);
        }
        getUser();
    }, []);

    useEffect(() => {

    }, []);

    const handleUploadProduct = async () => {
        const { data, error } = await supabase.from('products').insert([item])
        console.log(data)
        console.log(error)
    }

    const handleUploadAvatar = (event) => {
        const canvas = avatarRef.current;
        const ctx = canvas.getContext("2d");
        //clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const file = event.target.files[0];
        setAvatar(file);
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = avatarRef.current;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        };
        reader.readAsDataURL(file);
    }

    const handleUploadProductImg = (event) => {
        const canvas = productImgRef.current;
        const ctx = canvas.getContext("2d");
        //clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const file = event.target.files[0];
        setProductImg(file);
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = productImgRef.current;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        };
        reader.readAsDataURL(file);
    }

    const uploadAvatarSupabase = async () => {
        const nameparts = avatar.name.split(".");
        const { data, error } = await supabase.storage
            .from("image")
            .upload(`private/${currentUser.email + "." + nameparts[nameparts.length - 1]}`, avatar);
        console.log(data)
        console.log(error)
    }

    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log(e)
    }

    return (
        <div className="w-full h-full flex flex-row items-center justify-center min-h-screen py-2 bg-cover bg-center text-white gap-[2%]" style={{backgroundImage: "url(/acg3.jpg)"}}>
            <div className="avatar_uploader w-[20%] h-[85vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="border-2 border-violet-500 mb-[5vh] ">
                        <canvas ref={avatarRef} className="w-[200px] h-[200px]" >
                        
                        </canvas>
                    </div>
                    <input ref={avatarUploaderRef} type="file" accept="image/*" onChange={(e) => handleUploadAvatar(e)} className="hidden"/>
                    <button className="bg-violet-500 w-[80%] h-[8vh] text-white rounded-xl hover:text-cyan-400 mb-[2vh]" onClick={() => avatarUploaderRef.current.click() }> choose your avatar</button>
                    <button className="bg-violet-500 w-[80%] h-[8vh] text-white rounded-xl hover:text-cyan-400" onClick={uploadAvatarSupabase}> upload your avatar</button>
            </div>
            <div className="product_management w-[35%] h-[85vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-md p-[1rem] text-black">
                <div className="border-2 border-violet-500 w-max">
                    <canvas ref={productImgRef} className="w-[200px] h-[200px]" > </canvas>
                </div>
                <button className="bg-violet-500 w-[80%] h-[8vh] text-white rounded-xl hover:text-cyan-400 mb-[2vh]" onClick={() => productImgUploaderRef.current.click() }> choose your product image</button>    
                <form className="w-full h-full flex flex-col justify-start items-center gap-y-[2vh]" onSubmit={(e) => handleSubmit(e)}>
                    <input ref={productImgUploaderRef} type="file" id="productImg" accept="image/*" onChange={(e) => handleUploadProductImg(e)} className="hidden"/>
                    <input type="text" required id="name" placeholder="product name" className="w-[90%] h-[7vh] px-[3px]" onInput={(e) => setName(e.target.value)}/>
                    <input type="number" required id="price" placeholder="price" className="w-[90%] h-[7vh] px-[3px]" onInput={(e) => setPrice(e.target.value)}/>
                    <input type="number" required id="stock" placeholder="stock" className="w-[90%] h-[7vh] px-[3px]" onInput={(e) => setStock(e.target.value)}/>
                    <input type="text" required id="seller" placeholder="seller" className="w-[90%] h-[7vh] px-[3px]"   onInput={(e) => setSeller(e.target.value)}/>
                    <input type="submit" value="upload" className="bg-violet-500 w-[90%] h-[8vh] text-white rounded-xl hover:text-cyan-400"/> 
                </form>
            </div>
            <div className="benefit_management w-[35%] h-[85vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-md">
                    manage orders and benefits
            </div>
        </div>
    );
}
"use client"
import { createClient } from "@/util/supabase/client";
import { useState, useEffect, useRef } from "react";
import { Space, Table, Tag } from 'antd';
import EditableTable from "@/components/EditableTable";
 
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
        title: 'Amount',
        dataIndex: 'stock',
        key: 'stock',
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
];

const data = [
    {
      key: '1',
      name: 'coke',
      price: 2.9,
      stock: 10,
    },
    {
      key: '2',
      name: 'sprite',
      price: 2.3,
      stock: 15,
    },
];

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
    //const [imgName, setImgName] = useState("")

    useEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            //console.log(user)
            setCurrentUser(user);
        }
        getUser();
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
        if (event.target.files.length === 0){
            return;
        }
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
        if (error) {
            console.log("Error uploading file:", error);
        } else {
            alert("Avatar uploaded successfully!");
        }
    }

    const uploadProductImageSupabase = async () => {
        const { data, error } = await supabase.storage
            .from("image")
            .upload(`private/products/${currentUser.email + "_" + productImg.name}`, productImg);
       if (error) {
            console.log("Error uploading file:", error);
       }  else {
            alert("Product image uploaded successfully!");
        }
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log(e)
    }

    return (
        <div className="w-full h-full flex flex-row items-center justify-center min-h-screen py-2 bg-cover bg-center text-white gap-[1%] relative" style={{backgroundImage: "url(/acg3.jpg)"}}>
            <p className="absolute text-white right-0 top-0"> {currentUser?.email? `Current User: ${currentUser.email} ` : "Please log in"}</p>
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
                <div className="flex flex-row justify-between items-center mb-[4vh]">
                    <div className="border-2 border-violet-500 w-max">
                        <canvas ref={productImgRef} className="w-[250px] h-[200px]" > </canvas>
                    </div>
                    <div className="flex flex-col w-[15vw]">
                        <button className="bg-violet-500 w-full h-[10vh] text-white rounded-xl hover:text-cyan-400 mb-[2vh]" onClick={() => productImgUploaderRef.current.click() }> choose your product image</button>    
                        <button className="bg-violet-500 w-full h-[10vh] text-white rounded-xl hover:text-cyan-400 mb-[2vh]" onClick={uploadProductImageSupabase}> upload image to supabase</button>  
                    </div>
                </div>
                <form className="w-full flex flex-col justify-start items-center gap-y-[2vh]" onSubmit={(e) => handleSubmit(e)}>
                    <input ref={productImgUploaderRef} type="file" id="productImg" accept="image/*" onChange={(e) => handleUploadProductImg(e)} className="hidden"/>
                    <input type="text" required id="name" placeholder="enter the product's name" className="w-[90%] h-[7vh] px-[3px]" onInput={(e) => setName(e.target.value)}/>
                    <input type="number" required id="price" placeholder="enter the price" className="w-[90%] h-[7vh] px-[3px]" onInput={(e) => setPrice(e.target.value)}/>
                    <input type="number" required id="stock" placeholder="enter the amount you want to sell" className="w-[90%] h-[7vh] px-[3px]" onInput={(e) => setStock(e.target.value)}/>
                    <input type="email" required id="seller" placeholder="enter your email address" className="w-[90%] h-[7vh] px-[3px]"   onInput={(e) => setSeller(e.target.value)}/>
                    <input type="submit" value="Add" className="bg-violet-500 w-[90%] h-[8vh] text-white rounded-xl hover:text-cyan-400"/> 
                </form>
            </div>
            <div className="benefit_management w-[35%] h-[85vh]">
                {/* <Table columns={columns} dataSource={data} /> */}
                <EditableTable />
            </div>
        </div>
    );
}
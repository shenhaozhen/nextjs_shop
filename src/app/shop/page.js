import Product from "@/components/Product";

export default function Shop() {
    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center text-white" style={{backgroundImage: "url(/acg4.jpeg)"}}>
            
            <div className="w-[90%] h-[90vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-md flex flex-row justify-start items-center flex-wrap pl-[10vw] gap-x-[100px] relative">
                <p className="absolute top-0 left-0">Click the image for more details of each item</p>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
            </div>
        </div>
    );
}
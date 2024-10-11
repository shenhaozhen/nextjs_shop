import { NextResponse } from "next/server";


export const GET = async (request) => {

    try {
      return new NextResponse("this page should be called using post", { status: 200 });
      
    } catch (err) {
  
      return new NextResponse(err.message , { status: 500 });
  
    }

};

// hotmail -shz1995 qq-1234567
export const POST = async (request) => {

    const body = await request.json();

    console.log("sign up info" , body)


    try {
  
        return new NextResponse("New user has been created", { status: 201 });
    } catch (err) {
         return new NextResponse(err.message , { status: 500 });
    }

};
  

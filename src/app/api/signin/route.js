import { NextResponse } from "next/server";

export const POST = async (request) => {

    const body = await request.json();

    console.log("sign in info" ,body)

    try {

        return new NextResponse("sign in successfully", { status: 201 });

    } catch (err) {
         return new NextResponse(err.message , { status: 500 });
    }

};
  
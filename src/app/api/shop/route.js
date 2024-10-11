import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        return new NextResponse("this api gives alll products' info", { status: 200 });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
}
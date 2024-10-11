import { NextResponse } from "next/server";
import { createClient } from "@/util/supabase/server";


export const GET = async (request) => {

    const supabase = createClient();


    const { data: { user } } = await supabase.auth.getUser()


    try {

        return new NextResponse(user, { status: 201 });

    } catch (err) {
         return new NextResponse(err.message , { status: 500 });
    }
};
  
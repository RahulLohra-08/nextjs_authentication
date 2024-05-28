import connect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect(); 

        const response =  NextResponse.json({message: "Logout successfully...!", success: true})
        response.cookies.set('token', "", {
            httpOnly: true, // Cookie is only accessible via HTTP(S) requests
            secure: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

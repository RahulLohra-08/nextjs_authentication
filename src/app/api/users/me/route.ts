import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/user.model";

export async function GET(request: NextRequest) {

    try {
        await connect();
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password")  //find user with id  but I don't want to see password.
        return NextResponse.json({ message: "User found", data: user, success: true });
    } catch (error:any) {
        console.log("Error: ", error.message)
    }   
}
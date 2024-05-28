import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

export async function POST(request: NextRequest) {
    try {

        const reqBody = request.json();
        const { token } = await reqBody;   // await lagana jaruri hai.
        // console.log("VerifyToken: ", token,);

        const user = await User.findOne({verifyToken: token, verifyExpireToken: {$gt: Date.now()}})  //checked token user availabled or not; also checked token expired or not.

        //checked user exist
        if (!user) {
            return NextResponse.json(
                { error: "Invalid Token" },
                { status: 400}
            )
        }

        // console.log("🧊Verify user: ", user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyExpireToken = undefined;
         
        await user.save();

        //if user will be verified then redirect to login page.
        // return NextResponse.redirect("/login")

        return NextResponse.json(
            { message: "Email Verified Successfully 😍", success: true },
            { status: 200}
        )

    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            }, { status: 500 }
        )
    }
}
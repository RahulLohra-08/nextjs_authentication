import connect from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connect();

    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;

        //find user
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpire: { $gt: Date.now() }})

        //check token expired or not
        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        const hashPassword = await bcrypt.hash(password, 10);  //bcrypt password
        user.password = hashPassword;
        user.forgotPasswordToken= undefined;
        user.forgotPasswordTokenExpire= undefined;

        await user.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
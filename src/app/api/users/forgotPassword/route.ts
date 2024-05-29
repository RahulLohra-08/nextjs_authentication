import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { sendMail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {

        const reqBody = request.json();
        const { email } = await reqBody;   // await lagana jaruri hai.

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await sendMail({ email: user.email, emailType: "RESET", userId: user._id });
 
        return NextResponse.json({ message: "Password reset link sent to your email" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            }, { status: 500 }
        )
    }
}
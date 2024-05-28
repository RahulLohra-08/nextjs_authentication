import connect from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function POST(request: NextRequest) {
    try {
        await connect();   //connect the database: important

        const { email, password } = await request.json();

        console.log("Email: ", email)
                
        //find user
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({error: "User does not exists"},{status: 400})
        }

        //check if password is correct
        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({error: "Incorrect password"},{status: 400})
        }

        //tokenData 
        const tokenData = {
            userId: user._id,
            username: user.username,
            email: user.email,
        }

        // Generate JWT token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });  //process.env.TOKEN_SECRET! <-------------   ! <-----this operator denote that it always be available here 

        // Store token in cookies
        const response = NextResponse.json({ message: "Login successful", success: true });
        
        response.cookies.set('token', token, {
            httpOnly: true, // Cookie is only accessible via HTTP(S) requests
            secure: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

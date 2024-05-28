import connect from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { NextResponse, NextRequest } from "next/server"
import bcryptjs from 'bcryptjs'

 //connection to database// call the function

export async function POST(request: NextRequest) {
    try {
        await connect(); //connect to the database;
        const reqBody = await request.json() //destructure req.json
        
        const {username, email, password } = reqBody
                
        //Fine email
        const user = await User.findOne({ email: email })
        
        //check user already exist
        if (user) {
            return NextResponse.json(
                {
                    error: "User already exists!",
                }, 
                { status: 400 }
            )
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt) //two parameter: 1. password,  2. salt value.

            const newUser = await new User ( //create user through new keyword
                {
                    username,
                    email,
                    password: hashPassword //hash value store in database
                }
            )

        const savedUser = await newUser.save(); //save user on db

        console.log("Saved user: ", savedUser)

        return NextResponse.json(
            {
                message: "User Created successfully",
                success: true,
                savedUser
            }
        )

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
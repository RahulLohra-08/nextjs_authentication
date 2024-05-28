import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

// We get data of the login user through Token
export const getDataFromToken = async (request: NextRequest) => {
 try {
    const token = request.cookies.get("token")?.value || ""
    const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.userId;   //Login ke time token me kay payload bhej rahe hai usse hi return karna hai. Maine userId send kia hai login ke time user ka. islye userId return karenge taki user mil jai.
 } catch (error: any) {
    throw new Error("getTokenError: ", error.message)
 }
}
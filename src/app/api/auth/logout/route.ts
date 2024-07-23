import { NextRequest, NextResponse } from "next/server";
import { ConnectionToDB } from "@/configs/db_config";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";
import { getToken } from "next-auth/jwt";


export async function GET(request: NextRequest) {
    try {

        // const session = await getServerSession(authOptions);
        // console.log("SESSION IS --> ",session);

        const response = NextResponse.json(
            {
                message: "Logout successful",
            }
        )
        // let token = request.cookies.get('next-auth.session-token')?.value || request.cookies.get('token')?.value;
       
        // if (response.cookies.get("token")?.value) {
            await response.cookies.delete("token");
        // }
        // else {
            await response.cookies.delete("next-auth.session-token")
        // }

        return response;
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
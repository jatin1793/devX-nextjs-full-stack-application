import { NextRequest, NextResponse } from "next/server";
import { ConnectionToDB } from "@/configs/db_config";
import { User } from "@/models/user.model";
import { Source_file } from "@/models/source_file.model"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

ConnectionToDB();

export async function GET(req: NextRequest) {
    try {
        const { user } = await getServerSession(authOptions);
       
        let all_files = await Source_file.find({ owner: user.email })

        if (!all_files) {
            return NextResponse.json({ error: "No files found for the user" })
        }

        return NextResponse.json({
            message: "Files found",
            status: 200,
            all_files
        })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message, status: 500 })
    }
}
import { NextRequest, NextResponse } from "next/server";
import { ConnectionToDB } from "@/configs/db_config";
import { User } from "@/models/user.model";
import { Source_file } from "@/models/source_file.model"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

ConnectionToDB();

export async function POST(req: NextRequest) {
    try {
        const { user } = await getServerSession(authOptions);
        const { language, nameOfFile } = await req.json()

        let newFile = await Source_file.create({
            owner: user.email,
            language_name: language,
            nameOfFile: nameOfFile
        })

        if (!newFile) {
            return NextResponse.json({ error: "File not created. Something went wrong !" })
        }

        return NextResponse.json({
            message: "File created successfully",
            status: 200,
            newFile
        })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message, status: 500 })
    }
}
import { NextRequest, NextResponse } from "next/server";
import { ConnectionToDB } from "@/configs/db_config";
import { User } from "@/models/user.model";
import { Source_file } from "@/models/source_file.model"
import { getServerSession } from "next-auth";

ConnectionToDB();

export async function POST(req: NextRequest) {
    try {
        const { user } = await getServerSession();
        const { language, nameOfFile } = await req.json()
        console.log(nameOfFile, user.email)

        let newFile = await Source_file.create({
            owner: user.email,
            language_name: language,
            nameOfFile: nameOfFile
        })
        console.log(newFile)
        if (!newFile) {
            return NextResponse.json({ error: " Somehting went wrong" })
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
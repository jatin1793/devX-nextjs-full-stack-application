import { NextRequest, NextResponse } from "next/server";
import { ConnectionToDB } from "@/configs/db_config";
import { User } from "@/models/user.model";
import bcryptjs from "bcryptjs";

ConnectionToDB();

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json()

        const existing_user = await User.findOne({ email })
        if (existing_user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User created successfully",
            status: 200,
            savedUser
        })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
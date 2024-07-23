"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, Mail } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react";


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 4 characters.",
    }),
    username: z.string()
})

export default function SignupPage() {
    const router = useRouter();
    const [showPass, setshowPass] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/auth/signup", values);
            if (response.status === 200) {
                toast.success("Sign up successfully !")
                router.push('/')
            }
        } catch (error: any) {
            if (error?.response?.data?.error === "User already exists") {
                toast.error("User already exists");
            } else {
                toast.error("Something went wrong !")
            }
        }
    }

    // * Google login
    const googleLogin = async () => {
        await signIn("google", {
            callbackUrl: "/",
            redirect: true,
        });
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center max-w-2xl ">
                                    <Input
                                        type={showPass ? "text" : "password"}
                                        placeholder="Enter password"
                                        {...field}
                                        className=" pl-8"
                                    />
                                    {showPass ?
                                        (
                                            <EyeOffIcon
                                                className="cursor-pointer absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform"
                                                onClick={() => setshowPass(!showPass)}
                                            />
                                        ) : (
                                            <EyeIcon
                                                className="cursor-pointer absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform"
                                                onClick={() => setshowPass(!showPass)}
                                            />
                                        )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormDescription>Already have an account? <Link href="/login" className="text-blue-400">Login</Link></FormDescription>

                <Button type="submit">Submit</Button>
            </form>

            {/* Google Login Button */}
            <Button onClick={googleLogin}>
                <Mail className="mr-2 h-4 w-4" />
                Sign in with Google
            </Button>
        </Form>
    )
}

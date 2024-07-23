"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { languages } from "@/constants/languages";
import usePreventMultipleClicks from '../helpers/hooks/usePreventMultipleClicks';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Loader2 } from 'lucide-react';


const page = () => {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        reset
    } = useForm();

    const { handleClick, inProcess } = usePreventMultipleClicks();

    const createFileHandler = async (e: any) => {
        const res = await axios.post('/api/file/create-file', e);
        if (res) {
            router.push(`/editor/${res?.data?.newFile?._id}`);
            return toast.success("File created") 
        }
    }

    return (
        <Dialog onOpenChange={() => {
            reset();
            setValue("language", languages[0].name)
        }}>

            <DialogTrigger asChild>
                <Button variant="outline">Create File</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>Create File</DialogTitle>
                    <DialogDescription>
                        Create a new file. Click Create when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleClick(handleSubmit((data) => createFileHandler(data)))}>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name of file
                            </Label>
                            <Input
                                id="name"
                                defaultValue="demo"
                                className="col-span-3"
                                {...register('nameOfFile')}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="language" className="text-right">
                                Language
                            </Label>

                            <Select
                                onValueChange={(e: any) => {
                                    setValue("language", e)
                                }}
                                defaultValue={languages[0]?.name}
                            >
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages?.map((lang: any) => {
                                        return (
                                            <SelectItem key={lang} value={lang.name}>
                                                {lang.name} ({lang.version})
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className='w-full' size="lg">
                            {inProcess ?
                                <div className='flex'>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                </div>
                                : 'Create'
                            }
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default page
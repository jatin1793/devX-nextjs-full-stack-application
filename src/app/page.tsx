"use client"

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { languages } from "@/constants/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import NewFileDialog from '../components/NewFileDialog'

const page = () => {

  const router = useRouter();

  const logOutHandler = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res.status === 200) {
        toast.success("Log out successfully !")
        router.push('/login')
      }
    }
    catch (error: any) {
      toast.error("Something went wrong !")
    }
  }

  return (
    <div>
      Home page
      <Button onClick={logOutHandler}>Log out</Button>
      <Button onClick={()=> router.push('/view-all-files')}>View All Files</Button>
      <NewFileDialog />
    </div>
  )
}

export default page
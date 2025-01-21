"use client"
import React from 'react'
import Footer from '@/components/Footer'
import SplashScreen from '@/components/SplashScreen'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    enter_as: z.string(),
    email: z.string(),
    password: z.string(),
    remember_me: z.boolean()
})

const LoginPage = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            remember_me:false
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        router.push('/2fa')
    }

    return (
        <div className='flex flex-col flex-1 h-full w-full'>
            <div className='grid grid-cols-12 w-full h-full'>
                <div className='col-span-6'><SplashScreen /></div>
                <div className='col-span-6 flex items-center justify-center'>
                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full max-w-md'>
                            <div>
                                <h1 className='text-left capitalize text-[#4094D1] text-3xl font-bold'>Welcome back</h1>
                                <p className='text-muted-foreground text-sm'>Enter your email and password to sign in</p>
                            </div>
                            <div className='w-1/2 flex items-center gap-5'>
                                <FormField
                                    control={form.control}
                                    name="enter_as"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel className='text-sm font-bold'>Enter as</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='text-muted-foreground'>
                                                        <SelectValue placeholder="Select value" className='text-muted-foreground' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="manager">Manager</SelectItem>
                                                    <SelectItem value="staff_manager">Staff Manager</SelectItem>
                                                    <SelectItem value="super_admin">Super Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div></div>
                            </div>
                            <div className='flex items-center justify-between gap-5'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel className='text-sm font-bold'>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Input email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel className='text-sm font-bold'>Password</FormLabel>
                                            <FormControl>
                                                <Input type='password' placeholder="Input password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="remember_me"
                                    render={({ field }) => (
                                        <div className="flex items-center gap-5">
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <FormLabel>Remember me</FormLabel>


                                        </div>
                                    )}
                                />
                            </div>
                            <Button className='bg-neutral-300 text-white hover:bg-neutral-400 hover:text-white'>Login</Button>
                        </form>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginPage
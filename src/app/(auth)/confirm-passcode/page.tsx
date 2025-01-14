"use client"
import React from 'react'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {REGEXP_ONLY_DIGITS} from "input-otp";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    passcode: z.string()
})

export default function ConfirmPasscodePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })
    const router = useRouter()

    const {watch} = form

    const passcode = watch("passcode")

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log({values})
        router.push("/dashboard")
    }

    return (
        <div className={"w-full h-full flex items-center justify-center"}>
            <div className={"flex flex-col gap-5 w-full max-w-md"}>
                <h1 className={"text-primary text-xl font-bold"}>You need to input your passcode</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-6"}>
                        <FormField
                            control={form.control}
                            name="passcode"
                            render={({field}) => (
                                <FormItem className='w-full'>
                                    <FormLabel className='text-sm text-muted-foreground font-bold'>Confirm passcode</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={7}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            className='w-full flex flex-1 gap-5 items-center justify-center '
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} className={"h-14 w-14"}/>
                                            </InputOTPGroup>

                                            <InputOTPGroup>
                                                <InputOTPSlot index={1} className={"h-14 w-14"}/>
                                            </InputOTPGroup>

                                            <InputOTPGroup>
                                                <InputOTPSlot index={2} className={"h-14 w-14"}/>
                                            </InputOTPGroup>

                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} className={"h-14 w-14"}/>
                                            </InputOTPGroup>

                                            <InputOTPGroup>
                                                <InputOTPSlot index={4} className={"h-14 w-14"}/>
                                            </InputOTPGroup>

                                            <InputOTPGroup>
                                                <InputOTPSlot index={5} className={"h-14 w-14"}/>
                                            </InputOTPGroup>

                                            <InputOTPGroup>
                                                <InputOTPSlot index={6} className={"h-14 w-14"}/>
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className={"flex items-center justify-center gap-5"}>
                            <Button variant={"outline"} size={"lg"} className={"font-bold border-primary text-primary hover:text-primary/90"}>Back</Button>
                            <Button disabled={passcode?.length<7} size={"lg"} className={"bg-emerald-500 font-bold hover:bg-emerald-400"}>Confirm</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
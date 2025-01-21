"use client"
import React from 'react'

import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza"

import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Textarea } from '@/components/ui/textarea'


const freezeAccountSchema = z.object({
    reason: z.string()
})

type FreezeAccountSchemaType = z.infer<typeof freezeAccountSchema>

type FreezeAccountModalProps = {
    open: boolean,
    onOpenChange: (value: boolean) => void;
    onSubmit?: (data: FreezeAccountSchemaType) => void;

}

function FreezeAccountModal({ onOpenChange, open, onSubmit }: FreezeAccountModalProps) {

    const handleSubmit = (data: FreezeAccountSchemaType) => {

        onSubmit?.(data)
    }

    const form = useForm<FreezeAccountSchemaType>({
        resolver: zodResolver(freezeAccountSchema),

    })



    return (
        <Credenza open={open} onOpenChange={onOpenChange}>
            <CredenzaContent className='pt-11'>
                <CredenzaTitle className='text-primary text-left px-11'>Kindly provide explanation to user as to why their account has been frozen?</CredenzaTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-10 px-11'>
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-muted-foreground'>Provide reasons to user</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} className='resize-none' placeholder="input reason here" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center justify-center gap-8'>
                            <Button onClick={()=>onOpenChange(false)} size={"lg"} variant={"outline"} className='border-primary text-primary' type='button'>Cancel</Button>
                            <Button size={"lg"} variant={"destructive"}>Freeze account</Button>
                        </div>
                    </form>
                </Form>
            </CredenzaContent>
        </Credenza>
    )
}

export default FreezeAccountModal
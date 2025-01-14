'use client'

import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {REGEXP_ONLY_DIGITS_AND_CHARS} from "input-otp"
import {MdVerified} from "react-icons/md";
import {useRouter} from "next/navigation";

type VerificationMethod = 'phone' | 'email'

const Spacer = () => <div className={"w-0.5"}></div>

export default function TwoFactorVerification({email, phone_number}: { email?: string, phone_number?: string }) {
   const router = useRouter()
    const [method, setMethod] = useState<VerificationMethod>('email')
    const [codeSent, setCodeSent] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')

    const handleSendCode = () => {
        setCodeSent(true)
    }

    const handleConfirmCode = () => {
        if (verificationCode.length === 6) {
            setIsSuccessful(true)

            setTimeout(()=>{
                router.push("/confirm-passcode")
            },3000)
        }
    }

    const handleToggleMethod = () => {
        setMethod(method === 'phone' ? 'email' : 'phone')
        setCodeSent(false)
        setIsSuccessful(false)
        setVerificationCode('')
    }

    const getEmailOrPhone = () => {
        if (method === 'phone' && phone_number) {
            // Return obfuscated phone number (e.g., '+1 *** *** 1234')
            return phone_number.replace(/(\+\d{1,3})?(\d{2})\d{5}(\d{2})/, '$1 $2*** ***$3');
        } else if (method === 'email' && email) {
            // Return obfuscated email (e.g., 'joh***@gmail.com' or 'joh***@gmail.com')
            const [localPart, domain] = email.split('@');
            const visiblePart = localPart.slice(0, 3); // Get the first 3 characters of the local part
            return `${visiblePart}***@${domain}`;
        }
        return 'N/A'; // Fallback if neither email nor phone is provided
    };

    if (isSuccessful) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <MdVerified className="w-12 h-12 text-emerald-500"/>
                <p className="text-lg font-bold text-primary">
                    2FA verification successful!
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {!codeSent && (
                <p className="text-lg text-primary font-black">
                    To make sure it is you, we will send a<br/> verification code to <span
                    className='text-muted-foreground font-light'>{getEmailOrPhone()}</span>.
                </p>
            )}


            {codeSent ? (
                <div className="space-y-4">
                    <p className="text-lg text-primary font-bold">
                        We sent a verification code to{' '}<br/>
                        <span className="text-muted-foreground font-thin">
                            {getEmailOrPhone()}
                        </span>
                    </p>
                    <div className={"w-full flex flex-col"}>
                        <label className='text-muted-foreground text-sm'>Enter code</label>
                        <InputOTP
                            maxLength={7}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            className='w-full flex flex-1 items-center justify-center bg-blue-600'
                            value={verificationCode}
                            onChange={(value) => setVerificationCode(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0}/>
                            </InputOTPGroup>
                            <Spacer/>
                            <InputOTPGroup>
                                <InputOTPSlot index={1}/>
                            </InputOTPGroup>
                            <Spacer/>
                            <InputOTPGroup>
                                <InputOTPSlot index={2}/>
                            </InputOTPGroup>
                            <Spacer/>
                            <InputOTPGroup>
                                <InputOTPSlot index={3}/>
                            </InputOTPGroup>
                            <Spacer/>
                            <InputOTPGroup>
                                <InputOTPSlot index={4}/>
                            </InputOTPGroup>
                            <Spacer/>
                            <InputOTPGroup>
                                <InputOTPSlot index={5}/>
                            </InputOTPGroup>
                            <Spacer/>
                            <InputOTPGroup>
                                <InputOTPSlot index={6}/>
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                </div>
            ) : (
                <Button
                    className="w-full"
                    variant="default"
                    onClick={handleSendCode}
                >
                    Send code
                </Button>
            )}

            <button
                onClick={handleToggleMethod}
                className="text-sm font-semibold underline text-primary hover:text-primary/80 w-full text-center"
            >
                Use {method === 'phone' ? 'email' : 'phone'} instead
            </button>

            {codeSent && (
                <>
                    <button
                        onClick={handleSendCode}
                        className="text-sm text-blue-500 hover:text-blue-600 w-full text-center"
                    >
                        Resend code
                    </button>
                    <Button
                        className="w-full bg-emerald-500 hover:bg-emerald-600"
                        onClick={handleConfirmCode}
                        disabled={verificationCode.length !== 6}
                    >
                        Confirm code
                    </Button>
                </>
            )}
        </div>
    )
}


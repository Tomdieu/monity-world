import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasscodeModalProps {
  open: boolean;
  title: string;
  onAccept: (passcode: string) => void;
  onCancel: () => void;
  variant?: "create" | "delete" | "save" | "confirm" | "delete-staff";
  submitButtonText?: string;
  cancelButtonText?: string;
}

const formSchema = z.object({
  passcode: z.string().length(7, "Please enter a complete passcode"),
});

const BUTTON_VARIANTS = {
  create: {
    className: "bg-emerald-500 hover:bg-emerald-600",
    icon: <Check className="w-4 h-4" />,
    defaultText: "Create",
  },
  save: {
    className: "bg-emerald-500 hover:bg-emerald-600",
    icon: <Check className="w-4 h-4" />,
    defaultText: "Save edit",
  },
  delete: {
    className: "bg-red-500 hover:bg-red-600",
    icon: null,
    defaultText: "Delete",
  },
  "delete-staff": {
    className: "bg-red-500 hover:bg-red-600",
    icon: null,
    defaultText: "Delete staff",
  },
  confirm: {
    className: "bg-primary hover:bg-primary/90",
    icon: <Check className="w-4 h-4" />,
    defaultText: "Confirm",
  },
} as const;

function PasscodeModal({
  open,
  title,
  onAccept,
  onCancel,
  variant = "confirm",
  submitButtonText,
  cancelButtonText = "Cancel",
}: PasscodeModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passcode: "",
    },
  });

  const { watch, reset } = form;
  const passcode = watch("passcode");

  // Reset form when modal closes
  React.useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAccept(values.passcode);
  };

  const buttonConfig = BUTTON_VARIANTS[variant];

  return (
    <Dialog open={open}>
      <DialogContent showIcon={false} className="max-w-md">
        <DialogTitle className="text-center text-primary text-base">
          {title}
        </DialogTitle>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="passcode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm text-muted-foreground">
                      Provide passcode
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={7}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {[...Array(7)].map((_, i) => (
                          <InputOTPGroup key={i}>
                            <InputOTPSlot
                              index={i}
                              className="h-12 w-12"
                            />
                          </InputOTPGroup>
                        ))}
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/5 min-w-[140px]"
                  onClick={onCancel}
                >
                  {cancelButtonText}
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!passcode || passcode.length < 7}
                  className={cn(
                    "text-white font-medium min-w-[140px]",
                    buttonConfig.className
                  )}
                >
                  {submitButtonText || buttonConfig.defaultText}
                  {buttonConfig.icon}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PasscodeModal;
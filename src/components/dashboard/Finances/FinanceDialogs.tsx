"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ExitDialog: React.FC<DialogProps> = ({
  onCancel,
  onConfirm,
  open,
}) => {
  return (
    <Dialog open={open} onOpenChange={(_open) => !_open && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogTitle className="text-center text-base text-gray-500">
          Are you sure you want to Exit? All changes will be discarded
        </DialogTitle>
        <DialogFooter className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button onClick={onConfirm} variant={"primary-outline"}>
              Yes,I want to leave
            </Button>
          </DialogClose>
          <Button onClick={onCancel} variant={"default"}>
            No,Stay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DiscardDialog: React.FC<DialogProps> = ({
  onCancel,
  onConfirm,
  open,
}) => {
  return (
    <Dialog open={open} onOpenChange={(_open) => !_open && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogTitle className="text-gray-500 text-base text-center">
          All edits will be discarded and you wont be able to get them back
        </DialogTitle>
        <DialogFooter className="w-full grid grid-cols-2 gap-3">
          <DialogClose asChild>
            <Button onClick={onCancel} variant={"destructive"}>
              Do not discard
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} variant={"success"}>
            Yes Discard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ConfirmPasscodeDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (passcode: string) => void;
}

const passcodeShema = z.object({
  passcode: z.string(),
});

type TpasscodeShema = z.infer<typeof passcodeShema>;

export const ConfirmPasscodeDialog: React.FC<ConfirmPasscodeDialogProps> = ({
  onCancel,
  onConfirm,
  open,
}) => {
  const form = useForm<TpasscodeShema>({
    resolver: zodResolver(passcodeShema),
    mode: "onSubmit",
  });

  const handleSubmit = ({ passcode }: TpasscodeShema) => {
    onConfirm(passcode);
  };

  return (
    <Dialog open={open} onOpenChange={(_open) => !_open && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogTitle className="text-primary text-sm text-center">
          This notification will be sent to the super admins for validation, to
          make sure it is you,please input your passcode
        </DialogTitle>
        <div>
          <Form {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="passcode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm text-muted-foreground font-semibold">
                      Provide passcode
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={7}
                        pattern={REGEXP_ONLY_DIGITS}
                        className="w-full grid grid-cols-7 flex-1 gap-2 "
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={0} className={"h-10 w-10"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={1} className={"h-10 w-10"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={2} className={"h-10 w-10"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={3} className={"h-10 w-10"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={4} className={"h-10 w-10"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={5} className={"h-10 w-10"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={6} className={"h-10 w-10"} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex items-center gap-4">
                <DialogClose asChild>
                  <Button className="w-full" type="button" onClick={onCancel} variant={"primary-outline"}>
                    I wish to check again
                  </Button>
                </DialogClose>
                <Button className="w-full" type="submit" variant={"destructive"}>
                  Yes Discard
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

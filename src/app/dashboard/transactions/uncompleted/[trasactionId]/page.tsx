"use client";
import { TransactionDetails } from "@/components/dashboard/Transactions/TransactionDetails";
import {
  AmountDetails,
  GeneralInformation,
  InvolvedParties,
} from "@/components/dashboard/Transactions/Uncomplete";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface ConfirmTransactionModalProps {
  open: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

const ConfirmTransactionModal: React.FC<ConfirmTransactionModalProps> = ({
  onAccept,
  onCancel,
  open,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md" showIcon={false}>
        <DialogTitle className="text-center text-muted-foreground font-bold">
          Do you confirm that this transaction respects our terms & policies?
        </DialogTitle>
        <div className="flex items-center gap-5 justify-center">
          <Button onClick={onCancel} variant={"destructive"}>
            I wish to check again
          </Button>
          <Button onClick={onAccept} variant={"success"}>
            Confirm Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface DeclineTransactionModalProps {
  open: boolean;
  onAbort: (reason: string) => void;
  onCheck: () => void;
}

const reasonSchema = z.object({
  reason: z
    .string()
    .min(1, "Please provide a reason for declining the transaction"),
});

type ReasonSchemaType = z.infer<typeof reasonSchema>;

const DeclineTransactionModal: React.FC<DeclineTransactionModalProps> = ({
  onAbort,
  onCheck,
  open,
}) => {
  const form = useForm<ReasonSchemaType>({
    resolver: zodResolver(reasonSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (data: ReasonSchemaType) => {
    onAbort(data.reason);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-xl p-6 space-y-6" showIcon={false}>
        <DialogTitle className="text-2xl text-center text-primary font-medium">
          Kindly provide explanation to user as
          <br />
          to why their Transaction was declined
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-muted-foreground">
                    Provide reasons to user
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Input reason here"
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4 justify-center">
              <Button
                type="button"
                onClick={onCheck}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 hover:text-primary min-w-[200px]"
              >
                I wish to check again
              </Button>
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 min-w-[200px]"
              >
                Abort transaction
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

function UncompletedTransactionsPage() {
  const transactionData = {
    id: "CM5836hjGx",
    type: "Transfer",
    status: "Pending",
    currency: "XAF",
    date: "17-01-2024",
    time: "18:45",
    amount: "78,200",
    fees: "750",
    total: "78 950",
    reference: "Notes or purpose of the transaction here",
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 overflow-y-auto p-5 pb-11">
      <ConfirmTransactionModal
        open={isConfirmOpen}
        onAccept={() => setIsConfirmOpen(false)}
        onCancel={() => setIsConfirmOpen(false)}
      />
      <DeclineTransactionModal
        open={isDeclineOpen}
        onAbort={(reason) => setIsDeclineOpen(false)}
        onCheck={() => setIsDeclineOpen(false)}
      />
      <div className="flex items-center gap-2">
        <Button
          size={"icon"}
          className="rounded-full bg-primary/10 hover:bg-primary/20"
        >
          <ArrowLeft className="size-4 text-primary" />
        </Button>
        <span className="font-semibold text-muted-foreground">Return</span>
      </div>
      <div className="space-y-6 p-6">
        <GeneralInformation
          transactionId="#CM5836hjGx"
          transactionType="Tranfer"
          status={{ status: "Pending", color: "yellow" }}
          currency="XAF"
          date="17-01-2024"
          time="18:45"
        />

        <AmountDetails
          transactionAmount={78200}
          transactionFees={750}
          totalDebited={78950}
          reference="Notes or purpose of the transaction here"
        />
        <InvolvedParties
          sender={{
            name: "Nguh fabs demo",
            accountId: "Account ID",
            avatar: "/images/img1.png",
          }}
          recipient={{
            name: "Nguh fabs demo",
            accountId: "Account ID",
            avatar: "/images/img1.png",
          }}
          paymentMethod="Digital wallet"
          onViewProfile={() => {}}
        />
        <div className="flex items-center w-full justify-center gap-5 bg-primary/5 p-5 rounded-lg">
          <Button onClick={()=>setIsDeclineOpen(true)} variant={"destructive"} size={"lg"}>
            Abort transaction
          </Button>
          <Button
            className="bg-success hover:bg-success/90 text-white"
            size={"lg"}
            onClick={() => setIsConfirmOpen(true)}
          >
            Confirm transaction
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UncompletedTransactionsPage;

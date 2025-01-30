import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";

interface FeeRange {
  from: number;
  to: number;
  fee: number;
}

interface InternationalFeesProps {
  initialFees: FeeRange[];
  onSave: (fees: FeeRange[]) => void;
  onDiscard: () => void;
  onReturn?: () => void;
  className?: string;
}

const feeRangeSchema = z.object({
  ranges: z.array(z.object({
    from: z.number().min(0),
    to: z.number().min(0),
    fee: z.number().min(0).max(100)
  }))
});

const InternationalFees: React.FC<InternationalFeesProps> = ({
  initialFees,
  onSave,
  onDiscard,
  onReturn,
  className
}) => {
  const form = useForm<z.infer<typeof feeRangeSchema>>({
    resolver: zodResolver(feeRangeSchema),
    defaultValues: {
      ranges: initialFees
    }
  });

  const onSubmit = (values: z.infer<typeof feeRangeSchema>) => {
    onSave(values.ranges);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Return Button */}
      <Button
        variant="ghost"
        onClick={onReturn}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="size-4 mr-2" />
        Return
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Sending Charges Section */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-6">Sending charges</h2>
            <div className="space-y-6">
              {initialFees.map((range, index) => (
                <div key={index} className="grid grid-cols-3 gap-6">
                  {/* From Amount */}
                  <div>
                    <label className="text-sm text-gray-500 mb-1.5 block">From</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={range.from.toLocaleString()}
                        className="w-full pl-4 pr-12 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          form.setValue(`ranges.${index}.from`, Number(value));
                        }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">XAF</span>
                    </div>
                  </div>

                  {/* To Amount */}
                  <div>
                    <label className="text-sm text-gray-500 mb-1.5 block">To</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={range.to.toLocaleString()}
                        className="w-full pl-4 pr-12 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          form.setValue(`ranges.${index}.to`, Number(value));
                        }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">XAF</span>
                    </div>
                  </div>

                  {/* Fee Percentage */}
                  <div>
                    <label className="text-sm text-gray-500 mb-1.5 block">Fees</label>
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between pl-4 pr-3 py-2 text-red-500 bg-white border border-red-200 rounded-md hover:bg-red-50"
                      >
                        <span>{range.fee.toFixed(2)} %</span>
                        <ChevronDown className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="max-w-2xl mx-auto flex justify-end gap-4">
              <Button
                type="button"
                variant="destructive"
                onClick={onDiscard}
              >
                Discard changes
              </Button>
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

// Sample Data
export const sampleFees: FeeRange[] = [
  { from: 0, to: 5000, fee: 0.25 },
  { from: 5001, to: 30000, fee: 0.20 },
  { from: 30001, to: 100000, fee: 0.15 },
  { from: 100001, to: 500000, fee: 0.10 },
  { from: 500001, to: 1000000, fee: 0.05 },
];

export default InternationalFees;
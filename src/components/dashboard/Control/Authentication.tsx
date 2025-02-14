import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Pencil } from "lucide-react";
import { AuthenticationDetails } from "@/types/staff";
import { cn } from "@/lib/utils";

const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passcode: z.string().min(6, "Passcode must be at least 6 characters")
});

type AuthFormValues = z.infer<typeof authSchema>;

interface AuthenticationProps {
  auth: AuthenticationDetails;
  onUpdate: (field: keyof AuthenticationDetails, value: string) => Promise<void>;
}

const Authentication: React.FC<AuthenticationProps> = ({ auth, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<keyof AuthenticationDetails | null>(null);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: auth
  });

  const handleEdit = async (field: keyof AuthenticationDetails) => {
    if (editingField === field) {
      try {
        setIsUpdating(field);
        const value = form.getValues(field);
        await onUpdate(field, value);
        setEditingField(null);
      } catch (error) {
        console.error(`Error updating ${field}:`, error);
      } finally {
        setIsUpdating(null);
      }
    } else {
      setEditingField(field);
    }
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Authentication</h3>
      <Form {...form}>
        <form className="grid grid-cols-3 gap-6">
          {(Object.keys(auth) as Array<keyof AuthenticationDetails>).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field: formField }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm text-gray-600 capitalize">
                    {field}
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...formField}
                        type={field === 'password' ? 'password' : 'text'}
                        readOnly={editingField !== field}
                        className={cn(
                          "w-full p-2 pr-16 border rounded-lg",
                          editingField !== field && "bg-gray-50"
                        )}
                      />
                    </FormControl>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                      {isUpdating === field ? (
                        <span className="text-blue-600 text-sm">Updating...</span>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                            onClick={() => handleCopy(formField.value)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "h-8 w-8 p-0",
                              editingField === field 
                                ? "text-green-600 hover:text-green-700"
                                : "text-blue-600 hover:text-blue-700"
                            )}
                            onClick={() => handleEdit(field)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </div>
  );
};

export default Authentication;
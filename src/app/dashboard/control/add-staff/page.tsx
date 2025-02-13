"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  Check,
  ChevronLeft,
  MoveRight,
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  Wallet,
  CreditCard,
  FolderKanban,
  DollarSign,
  HeadphonesIcon,
  Globe,
  Settings,
} from "lucide-react";
import PasscodeModal from "@/components/dashboard/PasscodeModal";

// Personal Details Schema
const personalDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+\d{3}\s?\d{9}$/, "Invalid phone number format"),
  cni: z.string().min(5, "CNI must be at least 5 characters"),
  gender: z.enum(["male", "female", "other"]),
  country: z.string().min(2, "Country is required"),
  town: z.string().min(2, "Town is required"),
  quarter: z.string().min(2, "Quarter is required"),
  coordinates: z.string().optional(),
  witnessName: z.string().min(2, "Witness name is required"),
  witnessPhone: z
    .string()
    .regex(/^\+\d{3}\s?\d{9}$/, "Invalid phone number format"),
});

// Role and Access Schema
const roleSchema = z.object({
  department: z.string().min(1, "Department is required"),
  specificRole: z.string().min(1, "Role is required"),
  accessLevels: z.object({
    dashboard: z.object({
      limited: z.boolean(),
      fullAccess: z.boolean(),
    }),
    users: z.object({
      limited: z.boolean(),
      fullAccess: z.boolean(),
    }),
    transactions: z.object({
      limited: z.boolean(),
      fullAccess: z.boolean(),
    }),
    savings: z.object({
      limited: z.boolean(),
      fullAccess: z.boolean(),
    }),
    cards: z.object({
      limited: z.boolean(),
      fullAccess: z.boolean(),
    }),
    projects: z.object({
      limited: z.boolean(),
      fullAccess: z.boolean(),
    }),
    finances: z.object({
      noAccess: z.boolean(),
    }),
    support: z.object({
      limited: z.boolean(),
      fullAccess: z.boolean(),
    }),
    internationalTransactions: z.object({
      limited: z.boolean(),
      fullAccess: z.boolean(),
    }),
    control: z.object({
      noAccess: z.boolean(),
    }),
  }),
  authentication: z.object({
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passcode: z.string().length(7, "Passcode must be 6 characters"),
  }),
  confirmAuthentication: z.object({
    username: z.string(),
    password: z.string(),
    passcode: z.string(),
  }),
});

const formSchema = z
  .object({
    ...personalDetailsSchema.shape,
    ...roleSchema.shape,
  })
  .refine(
    (data) =>
      data.authentication.username === data.confirmAuthentication.username,
    {
      message: "Usernames do not match",
      path: ["confirmAuthentication", "username"],
    }
  )
  .refine(
    (data) =>
      data.authentication.password === data.confirmAuthentication.password,
    {
      message: "Passwords do not match",
      path: ["confirmAuthentication", "password"],
    }
  )
  .refine(
    (data) =>
      data.authentication.passcode === data.confirmAuthentication.passcode,
    {
      message: "Passcodes do not match",
      path: ["confirmAuthentication", "passcode"],
    }
  );

  type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
      ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
      : `${Key}`;
  }[keyof ObjectType & (string | number)];
  
  type FormFields = z.infer<typeof formSchema>;
  type AccessLevelPath = NestedKeyOf<FormFields>;

export function AddUserForm() {
  const [step, setStep] = React.useState(1);
    const [openPasscodeModal,setOpenPasscodeModal] = useState(false)
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      cni: "",
      gender: "male",
      country: "",
      town: "",
      quarter: "",
      coordinates: "",
      witnessName: "",
      witnessPhone: "",
      department: "",
      specificRole: "",
      accessLevels: {
        dashboard: { limited: false, fullAccess: false },
        users: { limited: false, fullAccess: false },
        transactions: { limited: false, fullAccess: false },
        savings: { limited: false, fullAccess: false },
        cards: { limited: false, fullAccess: false },
        projects: { limited: false, fullAccess: false },
        finances: { noAccess: false },
        support: { limited: false, fullAccess: false },
        internationalTransactions: { limited: false, fullAccess: false },
        control: { noAccess: false },
      },
      authentication: {
        username: "",
        password: "",
        passcode: "",
      },
      confirmAuthentication: {
        username: "",
        password: "",
        passcode: "",
      },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handlePasscodeAccept = ()=>{
    setOpenPasscodeModal(false)
    // create staff logic here
  }

  const PersonalDetailsForm = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">Personal Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Surname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+237 XXXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNI</FormLabel>
                <FormControl>
                  <Input placeholder="Enter CNI number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          Additional Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="town"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Town" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quarter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quarter</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Quarter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coordinates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coordinates (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Coordinates" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="witnessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Witness Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Witness Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="witnessPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Witness Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+237 XXXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );

  const RoleAndAccessForm = () => {

    type AccessLevelIconKey = 'dashboard' | 'users' | 'transactions' | 'savings' | 'cards' | 
                         'projects' | 'finances' | 'support' | 'internationalTransactions' | 'control';


    const accessLevelIcons:Record<AccessLevelIconKey, React.ReactNode> = {
      dashboard: <LayoutDashboard className="w-4 h-4 text-primary" />,
      users: <Users className="w-4 h-4 text-primary" />,
      transactions: <ArrowLeftRight className="w-4 h-4 text-primary" />,
      savings: <Wallet className="w-4 h-4 text-primary" />,
      cards: <CreditCard className="w-4 h-4 text-primary" />,
      projects: <FolderKanban className="w-4 h-4 text-primary" />,
      finances: <DollarSign className="w-4 h-4 text-primary" />,
      support: <HeadphonesIcon className="w-4 h-4 text-primary" />,
      internationalTransactions: null, // <Globe className="w-4 h-4 text-primary" />,
      control: <Settings className="w-4 h-4 text-primary" />,
    };

    

    // Add this helper function to handle mutual exclusion
    const handleAccessChange = (key: string, type: 'limited' | 'fullAccess', checked: boolean) => {
      if (checked) {
        const fieldPath = `accessLevels.${key}.${type === 'limited' ? 'fullAccess' : 'limited'}` as const;
        form.setValue(fieldPath as AccessLevelPath, false);
      }
    };

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Role Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specificRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specific Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter specific role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Access Levels</h2>
          <div className="flex flex-wrap gap-5 overflow-x-scroll">
            {Object.entries(form.watch("accessLevels")).map(([key, value]) => (
              <div key={key} className="space-y-2">
                {accessLevelIcons[key as AccessLevelIconKey]!==null && (
                  <div className="w-full flex items-center justify-center">
                    <div className="rounded-full flex items-center justify-center w-fit p-2 bg-primary/20">
                      {accessLevelIcons[key as AccessLevelIconKey]}
                    </div>
                  </div>
                )}
                <p className="text-sm font-medium capitalize text-primary text-center">
                  {key}
                </p>
                {"limited" in value && (
                  <FormField
                    control={form.control}
                    name={`accessLevels.${key}.limited` as AccessLevelPath}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                handleAccessChange(key, 'limited', checked as boolean);
                              }}
                              className="border-stone-400 data-[state=checked]:border-orange-400 data-[state=checked]:bg-orange-400 data-[state=checked]:text-primary-foreground"
                            />
                            <FormLabel className="text-sm">Limited</FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                {"fullAccess" in value && (
                  <FormField
                    control={form.control}
                    name={`accessLevels.${key}.fullAccess` as AccessLevelPath}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                handleAccessChange(key, 'fullAccess', checked as boolean);
                              }}
                              className="border-stone-400 data-[state=checked]:border-red-400 data-[state=checked]:bg-red-500 data-[state=checked]:text-primary-foreground"
                            />
                            <FormLabel className="text-sm">
                              Full Access
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                {"noAccess" in value && (
                  <FormField
                    control={form.control}
                    name={`accessLevels.${key}.noAccess` as AccessLevelPath}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                            <FormLabel className="text-sm">No Access</FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Authentication</h2>
          <div className="grid grid-cols-2 gap-5">
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="authentication.username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="authentication.password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="authentication.passcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passcode</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={7}
                        pattern={REGEXP_ONLY_DIGITS}
                        className=""
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup className="">
                          <InputOTPSlot index={0} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={1} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={2} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={3} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={4} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={5} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={6} className={"h-12 w-12"} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="confirmAuthentication.username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmAuthentication.password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="confirmAuthentication.passcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Passcode</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={7}
                        pattern={REGEXP_ONLY_DIGITS}
                        className=""
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup className="">
                          <InputOTPSlot index={0} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={1} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={2} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={3} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={4} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={5} className={"h-12 w-12"} />
                        </InputOTPGroup>

                        <InputOTPGroup className="">
                          <InputOTPSlot index={6} className={"h-12 w-12"} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-y-auto container mx-auto p-6 pb-32">
      <PasscodeModal
              open={openPasscodeModal}
              onCancel={() => setOpenPasscodeModal(false)}
              onAccept={()=>handlePasscodeAccept()}
              title="This notification will be sent to the super admins for validation, to
                      make sure it is you,please input your passcode"
              variant="save"
            />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 overflow-y-auto h-full"
        >
          {step === 1 ? (
            <div className="flex flex-col gap-8 overflow-y-auto h-full">
              <PersonalDetailsForm />
              <div className="flex items-center justify-center w-full bg-gray-100 py-4">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-fit"
                >
                  Next
                  <MoveRight />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <RoleAndAccessForm />
              <div className="flex justify-center items-center gap-5  bg-gray-100 py-4">
                <Button
                  type="button"
                  className="bg-gray-400 text-white hover:bg-gray-400/90"
                  size={"lg"}
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft />
                  Back
                </Button>
                <Button size={"lg"} variant={"success"} type="submit">
                  Create
                  <Check />
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}

export default AddUserForm;

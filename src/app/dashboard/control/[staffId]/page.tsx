"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  Wallet,
  CreditCard,
  FolderKanban,
  DollarSign,
  Headphones,
  Globe,
  Settings,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  Copy,
  Trash2,
  PencilLine,
} from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PasscodeModal from "@/components/dashboard/PasscodeModal";
import { useParams, useRouter } from "next/navigation";

interface AccessLevel {
  id: string;
  icon: React.ReactNode;
  name: string;
  access: "limited" | "fullAccess" | "noAccess";
}

const StaffDetailPage = () => {
  // Staff information state
  const [staffInfo] = useState({
    id: "#CM154JY",
    name: "Staff Full Name",
    location: "Douala, Cameroon",
    phone: "+91 7048144030",
    email: "yghori@asite.com",
    status: "Active",
    sex: "M",
    role: "Customer Service",
    department: "Service",
    cni: "155xs4×3245xc4",
  });

  // Access levels state
  const [accessLevels, setAccessLevels] = useState<AccessLevel[]>([
    {
      id: "dashboard",
      icon: <LayoutDashboard className="h-6 w-6" />,
      name: "Dashboard",
      access: "fullAccess",
    },
    {
      id: "users",
      icon: <Users className="h-6 w-6" />,
      name: "Users",
      access: "limited",
    },
    {
      id: "transactions",
      icon: <ArrowLeftRight className="h-6 w-6" />,
      name: "Transactions",
      access: "limited",
    },
    {
      id: "savings",
      icon: <Wallet className="h-6 w-6" />,
      name: "Savings",
      access: "limited",
    },
    {
      id: "cards",
      icon: <CreditCard className="h-6 w-6" />,
      name: "Cards",
      access: "limited",
    },
    {
      id: "projects",
      icon: <FolderKanban className="h-6 w-6" />,
      name: "Projects",
      access: "noAccess",
    },
    {
      id: "finances",
      icon: <DollarSign className="h-6 w-6" />,
      name: "Finances",
      access: "noAccess",
    },
    {
      id: "support",
      icon: <Headphones className="h-6 w-6" />,
      name: "Support",
      access: "fullAccess",
    },
    {
      id: "international",
      icon: <Globe className="h-6 w-6" />,
      name: "International",
      access: "fullAccess",
    },
    {
      id: "control",
      icon: <Settings className="h-6 w-6" />,
      name: "Control",
      access: "noAccess",
    },
  ]);

  // Authentication state
  const [auth] = useState({
    username: "Username here",
    password: "#CM5836hjGx",
    passcode: "12355115",
  });

  // Handle access level change
  const handleAccessChange = (
    id: string,
    newAccess: "limited" | "fullAccess" | "noAccess"
  ) => {
    setAccessLevels((prev) =>
      prev.map((level) =>
        level.id === id ? { ...level, access: newAccess } : level
      )
    );
  };
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const {staffId} = useParams<{staffId:string}>()

  return (
    <div className="p-6 w-full mx-auto space-y-8 pb-36">
      <PasscodeModal
        open={open}
        onCancel={() => setOpen(false)}
        onAccept={() => {
          setOpen(false);
        }}
        title="This notification will be sent to the super admins for validation, to
          make sure it is you,please input your passcode"
          variant="delete-staff"
      />

      {/* Staff Profile Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-start gap-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500">
              <Image
                src="/images/img2.svg"
                alt={staffInfo.name}
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <div className=" bg-white px-4 py-1 text-center text-sm">
              <h1 className="text-2xl font-bold">{staffInfo.name}</h1>
              <span className="text-gray-500 block">{staffInfo.id}</span>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>{staffInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Sex:</span>
                <span className="text-blue-500">{staffInfo.sex}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>{staffInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Role:</span>
                <span className="text-blue-500">{staffInfo.role}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>{staffInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Department:</span>
                <span className="text-blue-500">{staffInfo.department}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Status:</span>
                <span className="inline-flex items-center gap-1 text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {staffInfo.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>CNI:</span>
                <span>{staffInfo.cni}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Access Levels Section */}
      <div className="">
        <h2 className="text-xl font-bold mb-6">Access Levels</h2>
        <div className="flex flex-wrap gap-6 bg-white rounded-lg p-6 shadow-sm">
          {accessLevels.map((level) => (
            <div key={level.id} className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 p-2 flex items-center justify-center text-blue-500">
                {level.icon}
              </div>
              <span className="text-sm font-medium">{level.name}</span>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    disabled
                    checked={level.access === "limited"}
                    onCheckedChange={(checked) =>
                      handleAccessChange(
                        level.id,
                        checked ? "limited" : "noAccess"
                      )
                    }
                    className="border-orange-400 data-[state=checked]:bg-orange-400"
                  />
                  <span className="text-sm">Limited</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                  disabled
                    checked={level.access === "fullAccess"}
                    onCheckedChange={(checked) =>
                      handleAccessChange(
                        level.id,
                        checked ? "fullAccess" : "noAccess"
                      )
                    }
                    className="border-red-500 data-[state=checked]:bg-red-500"
                  />
                  <span className="text-sm">Full Access</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Authentication Section */}
      <div className="">
        <h2 className="text-xl font-bold mb-6">Authentication</h2>
        <div className="grid grid-cols-3 gap-6 rounded-lg p-6 shadow-sm bg-white">
          <div className="space-y-2 border rounded-md p-2">
            <label className="text-sm text-gray-500">Username</label>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">{auth.username}</span>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2 border rounded-md p-2">
            <label className="text-sm text-gray-500">Password</label>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">{auth.password}</span>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2 border rounded-md p-2">
            <label className="text-sm text-gray-500">Passcode</label>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">{auth.passcode}</span>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent activities</h2>
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="transaction">Transaction</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date/Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" className="text-red-500">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Filter
            </Button>
          </div>
        </div>

        {/* Sample Activity */}
        <div className="border-l-2 border-blue-500 pl-4 ml-4">
          <div className="text-sm text-blue-500">09 Nov. 2024</div>
          <div className="text-sm text-gray-500">07:14am</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button onClick={()=>setOpen(true)}  variant="destructive" className="flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          Delete Staff
        </Button>
        <Button onClick={()=>router.push(`/dashboard/control/${staffId}/edit`)} className="flex items-center gap-2 text-white bg-gray-400 hover:bg-gray-400/80">
          <PencilLine className="h-4 w-4" />
          Edit Staff Info
        </Button>
      </div>
    </div>
  );
};

export default StaffDetailPage;

export interface StaffMember {
  id: string;
  fullName: string;
  location: string;
  phone: string;
  email: string;
  sex: 'M' | 'F';
  role: string;
  department: string;
  cni: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

export interface AccessLevel {
  name: string;
  access: 'Full Access' | 'Limited' | 'None';
  icon: React.ReactNode;
  checked: boolean;
  isDisabled?: boolean;
}

export interface AuthenticationDetails {
  username: string;
  password: string;
  passcode: string;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'pending' | 'failed';
}
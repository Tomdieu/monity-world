import {create} from 'zustand';

type UserType = 'manager' | 'staff_manager' | 'super_admin';

interface UserTypeState {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export const useUserTypeStore = create<UserTypeState>((set) => ({
  userType: 'manager', // default user type
  setUserType: (type: UserType) => set({ userType: type }),
}));

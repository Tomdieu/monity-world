import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserType = 'manager' | 'staff_manager' | 'super_admin';

interface UserTypeState {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export const useUserTypeStore = create<UserTypeState>()(persist(
  (set) => ({
    userType: 'manager', // default user type
    setUserType: (type: UserType) => set({ userType: type }),
  }),
  {
    name: 'user-type-store',
    storage:createJSONStorage(()=>sessionStorage)
  }
));

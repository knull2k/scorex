import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
  userProfile: null,
  // user profile
  allUsers: [],
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  /* GET USER PROFILE */
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    //zustand function
    set({ allUsers: response.data });
  },
  /* GET USER PROFILE */
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;

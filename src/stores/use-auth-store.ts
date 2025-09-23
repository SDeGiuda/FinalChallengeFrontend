/**
 * The `persist` middleware automatically saves the `token` to localStorage under the key "auth".
 * We only store the `token` here to comply with HIPAA regulations, ensuring that no sensitive user information
 * beyond authentication tokens is persisted.
 *
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthStoreState = {
  isLoggedIn: boolean;
};

const useAuthStore = create<AuthStoreState>()(
  persist(
    (_) => {
      return { isLoggedIn: false };
    },
    { name: "auth" },
  ),
);

export const getIsLoggedIn = () => {
  return useAuthStore.getState().isLoggedIn;
};

export const useSetIsLoggedIn = (isLoggedIn: boolean) => {
  return useAuthStore.setState(() => {
    return { isLoggedIn };
  });
};

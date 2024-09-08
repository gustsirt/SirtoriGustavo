import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUserSlice } from "./UserSlice";

export const useAppStore = create(devtools((set, get, api) => ({
    ...createUserSlice(set, get, api),
})));
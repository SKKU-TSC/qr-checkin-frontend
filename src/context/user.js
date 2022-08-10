import { createContext } from "react";

export const UserContext = createContext({
    userState: false,
    setUserState: () => {},
});
import { useUser } from "@/stores";
import { useState } from "@/ourReact/jsx-runtime";

export function useOnUserChange(callback: (user: any, prevUser: any) => void) {
  const user = useUser();
  const [prevUser, setPrevUser] = useState(user);

  if (user !== prevUser) {
    console.log("User changed", user, prevUser);
    callback(user, prevUser);
    setPrevUser(user);
  }
}

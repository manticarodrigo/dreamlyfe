import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { api } from "~/utils/api";

const UserContext = createContext<{
  userId: string | null;
  setUserId: (userId: string) => void;
}>({
  userId: null,
  setUserId: () => null,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);

  // prefetch user profile
  api.user.profile.get.useQuery({ userId }, { enabled: !!userId });

  const create = api.user.create.useMutation();

  useEffect(() => {
    void SecureStore.getItemAsync("userId").then((id) => {
      if (id) {
        setUserId(id);
      } else {
        create.mutate(
          {},
          {
            onSuccess: (data) => {
              if (data.id) {
                setUserId(data.id);
                void SecureStore.setItemAsync("userId", data.id);
              }
            },
          },
        );
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

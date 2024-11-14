import { SheetProvider } from "react-native-actions-sheet";

import { TRPCProvider } from "~/utils/api";
import { UserProvider } from "./user";

import "~/components/sheets";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <UserProvider>
        <SheetProvider context="global">{children}</SheetProvider>
      </UserProvider>
    </TRPCProvider>
  );
}

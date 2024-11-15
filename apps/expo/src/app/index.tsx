import { SafeAreaView } from "react-native-safe-area-context";

import OnboardingScreen from "~/components/onboarding";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingScreen />
    </SafeAreaView>
  );
}

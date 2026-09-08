import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function AppTabs() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="bubble" />
      <NativeTabs.Trigger name="floyd" />
      <NativeTabs.Trigger name="comparacao" />
    </NativeTabs>
  );
}
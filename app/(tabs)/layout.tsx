import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="books"
        options={{
          title: 'Books',
        }}
      />

      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
        }}
      />
    </Tabs>
  );
}
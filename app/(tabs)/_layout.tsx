import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { colors } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopColor: colors.border,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

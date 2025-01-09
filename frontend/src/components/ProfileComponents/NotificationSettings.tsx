// src/components/ProfileComponents/NotificationSettings.tsx
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { User } from '../../types/profile.types';

interface NotificationSettingsProps {
  settings: User['settings']['notifications'];
  onUpdate: (settings: User['settings']['notifications']) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onUpdate }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Notifications</Text>
    <View style={styles.settingItem}>
      <Text>All Notifications</Text>
      <Switch
        value={settings.enabled}
        onValueChange={(value) => onUpdate({ ...settings, enabled: value })}
      />
    </View>
    {settings.enabled && (
      <>
        <View style={styles.settingItem}>
          <Text>Workout Reminders</Text>
          <Switch
            value={settings.workoutReminders}
            onValueChange={(value) => onUpdate({ ...settings, workoutReminders: value })}
          />
        </View>
        <View style={styles.settingItem}>
          <Text>Meal Reminders</Text>
          <Switch
            value={settings.mealReminders}
            onValueChange={(value) => onUpdate({ ...settings, mealReminders: value })}
          />
        </View>
        <View style={styles.settingItem}>
          <Text>Progress Reminders</Text>
          <Switch
            value={settings.progressReminders}
            onValueChange={(value) => onUpdate({ ...settings, progressReminders: value })}
          />
        </View>
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF0000',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  }
});

export default NotificationSettings;
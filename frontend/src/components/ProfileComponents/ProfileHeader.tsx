// src/components/ProfileComponents/ProfileHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from '../../types/profile.types';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => (
  <View style={styles.header}>
    <Image
      source={{ uri: user.profilePicture || '/api/placeholder/100/100' }}
      style={styles.profilePicture}
    />
    <Text style={styles.name}>{user.name}</Text>
    <Text style={styles.email}>{user.email}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFE8E8',
    borderRadius: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  email: {
    fontSize: 16,
    color: '#666',
  }
});

export default ProfileHeader;
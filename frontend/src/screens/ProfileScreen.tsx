import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { profileService } from '../services/profileService';
import { User, ProfileUpdateData } from '../types/profile.types';
import PlanModification from '../components/ProfileComponents/PlanModification';
import ProfileHeader from '../components/ProfileComponents/ProfileHeader';
import StatsSection from '../components/ProfileComponents/StatsSection';
import NotificationSettings from '../components/ProfileComponents/NotificationSettings';
import EditProfileForm from '../components/ProfileComponents/EditProfileForm';

const ProfileScreen: React.FC = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlanModification, setShowPlanModification] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const userData = await profileService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  const handleUpdateProfile = async (data: ProfileUpdateData) => {
    try {
      const updatedUser = await profileService.updateProfile(data);
      setUser(updatedUser);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const SubscriptionInfo: React.FC = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Subscription</Text>
      <Text style={styles.infoText}>
        To request downgrades or cancellations, please email us at support@toastedfitness.com
      </Text>
    </View>
  );

  const handleUpdateNotifications = async (notificationSettings: User['settings']['notifications']) => {
    if (user) {
      try {
        const updatedUser = await profileService.updateProfile({
          settings: {
            ...user.settings,
            notifications: notificationSettings
          }
        });
        setUser(updatedUser);
      } catch (error) {
        console.error('Error updating notifications:', error);
        Alert.alert('Error', 'Failed to update notification settings');
      }
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await profileService.deleteAccount();
              logout();
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert('Error', 'Failed to delete account');
            }
          }
        }
      ]
    );
  };

  if (!user || isLoading) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader user={user} />
      
      {isEditing ? (
        <EditProfileForm
          user={user}
          onSubmit={handleUpdateProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <StatsSection user={user} />
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}

<View style={styles.section}>
  <TouchableOpacity 
    style={styles.editButton}
    onPress={() => setShowPlanModification(!showPlanModification)}
  >
    <Text style={styles.editButtonText}>
      {showPlanModification ? 'Cancel' : 'Modify Plans'}
    </Text>
  </TouchableOpacity>
  
  {showPlanModification && (
    <PlanModification
      currentPlan={{
        workoutPlanId: user.workoutPlanId,
        dietPlanId: user.dietPlanId
      }}
      onPlanUpdated={fetchProfile}
      onClose={() => setShowPlanModification(false)}
    />
  )}
</View>
      <NotificationSettings
        settings={user.settings.notifications}
        onUpdate={handleUpdateNotifications}
      />
      
      <SubscriptionInfo />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFE8E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: 10,
    marginTop: 20,
  },
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
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  warningText: {
    color: '#FF0000',
    textAlign: 'center',
    padding: 16,
  },
  logoutButton: {
    backgroundColor: '#FFE8E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  planInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF0000',
    fontWeight: 'bold',
  }
});

export default ProfileScreen;
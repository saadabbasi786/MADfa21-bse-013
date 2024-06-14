import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Platform, Alert, Button, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';

const AladhanApp = () => {
  const [prayerTimes, setPrayerTimes] = useState(null); // State to store prayer times
  const [fetchingLocation, setFetchingLocation] = useState(true); // State to manage fetching location status
  const [error, setError] = useState(null); // State to store error messages
  const [locationPermission, setLocationPermission] = useState(false); // State to store location permission status

  // Check for stored location on initial load
  useEffect(() => {
    checkStoredLocation();
  }, []);

  // Get location if permission is granted
  useEffect(() => {
    if (locationPermission) {
      getLocation();
    }
  }, [locationPermission]);

  // Function to check if location is stored in AsyncStorage
  const checkStoredLocation = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('userLocation');
      if (storedLocation) {
        const { latitude, longitude } = JSON.parse(storedLocation);
        fetchPrayerTimes(latitude, longitude);
      } else {
        requestLocationPermission();
      }
    } catch (error) {
      console.error('Error checking stored location:', error);
      requestLocationPermission();
    }
  };

  // Function to fetch prayer times from Aladhan API
  const fetchPrayerTimes = async (latitude, longitude) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    try {
      const address = `${latitude},${longitude}`;
      const response = await fetch(
        `http://api.aladhan.com/v1/timingsByAddress/${day}-${month}-${year}?address=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      setPrayerTimes(data.data);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setError('Error fetching prayer times');
    } finally {
      setFetchingLocation(false);
    }
  };

  // Function to request location permission on Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to access your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationPermission(true);
        } else {
          setError('Location permission denied');
          setFetchingLocation(false);
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      checkAndRequestIOSPermission();
    }
  };

  // Function to check and request location permission on iOS
  const checkAndRequestIOSPermission = async () => {
    const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        setError('Location services are not available on this device');
        setFetchingLocation(false);
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          setLocationPermission(true);
        } else {
          setError('Location permission denied');
          setFetchingLocation(false);
        }
        break;
      case RESULTS.GRANTED:
        setLocationPermission(true);
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Location Permission Blocked',
          'Please enable location services in settings',
          [{ text: 'OK', onPress: () => setFetchingLocation(false) }],
          { cancelable: false }
        );
        break;
    }
  };

  // Function to get the current location of the user
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          await AsyncStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
        } catch (error) {
          console.error('Error storing location:', error);
        }
        fetchPrayerTimes(latitude, longitude);
      },
      error => {
        console.error('Error getting current location:', error);
        setError('Error getting current location');
        setFetchingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Function to get the current or next prayer time
  const getCurrentPrayer = () => {
    if (!prayerTimes) return null;

    const now = new Date();
    const timings = prayerTimes.timings;
    const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    const parsedPrayerTimes = prayerNames.map(prayer => {
      const [hours, minutes] = timings[prayer].split(':');
      const prayerDate = new Date(now);
      prayerDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      return { prayer, time: prayerDate };
    });

    parsedPrayerTimes.sort((a, b) => a.time - b.time);

    const nextPrayer = parsedPrayerTimes.find(prayerTime => now < prayerTime.time);

    return nextPrayer ? nextPrayer.prayer : 'Fajr';
  };

  const currentPrayer = getCurrentPrayer();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fetchingLocation ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Fetching your current location...</Text>
          {!locationPermission && (
            <Button
              title="Allow Location Access"
              onPress={requestLocationPermission}
            />
          )}
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text>{error}</Text>
        </View>
      ) : (
        prayerTimes && (
          <View style={styles.card}>
            <Text style={styles.date}>Date: {prayerTimes.date.gregorian.date}</Text>
            {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(prayer => (
              <View
                key={prayer}
                style={[
                  styles.timeRow,
                  currentPrayer === prayer && styles.highlight,
                ]}
              >
                <Text style={styles.label}>{prayer}:</Text>
                <Text style={styles.time}>{prayerTimes.timings[prayer]}</Text>
              </View>
            ))}
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 16,
    fontWeight: '400',
  },
  highlight: {
    backgroundColor: '#d4edda',
    borderRadius: 4,
  },
});

export default AladhanApp;

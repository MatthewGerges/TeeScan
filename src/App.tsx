/* eslint-disable */
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppProvider, UserProvider} from '@realm/react';

import {appId, baseUrl} from '../atlasConfig.json';
import {LogoutButton} from './LogoutButton';
import {WelcomeView} from './WelcomeView';
import {ItemListView} from './ItemListView';
import {realmContext} from './RealmContext';
import {OfflineModeButton} from './OfflineModeButton';

const {RealmProvider} = realmContext;

const Stack = createStackNavigator();

const AppWrapper = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <App />
      </UserProvider>
    </AppProvider>
  );
};

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const headerRight = () => {
  return <OfflineModeButton />;
};

const headerLeft = () => {
  return <LogoutButton />;
};

const App = () => {
  return (
    <>
      <RealmProvider
        sync={{
          flexible: true,
          onError: (_, error) => {
            // Show sync errors in the console
            console.error(error);
          },
        }}
        fallback={LoadingIndicator}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Your To-Do List"
                component={ItemListView}
                options={{
                  headerTitleAlign: 'center',
                  headerLeft,
                  headerRight,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Log in with the same account on another device or simulator to see
              your list sync in real time
            </Text>
          </View>
        </SafeAreaProvider>
      </RealmProvider>
    </>
  );
};

const styles = StyleSheet.create({
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AppWrapper;








// import React, { useState } from 'react';
// import { Text, View, Button } from 'react-native';
// import Realm from 'realm';
// import { createRealmContext } from '@realm/react';
// import { ObjectId } from 'bson';

// // Define your object model
// class Profile extends Realm.Object<Profile> {
//   _id!: Realm.BSON.ObjectId;
//   name!: string;
//   static schema = {
//     name: 'Profile',
//     properties: {
//       _id: 'objectId',
//       name: 'string',
//     },
//     primaryKey: '_id',
//   };
// }

// // Create a configuration object
// const realmConfig: Realm.Configuration = {
//   schema: [Profile],
// };

// // Create a realm context
// const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);

// // Expose a realm
// function AppWrapper() {
//   return (
//     <RealmProvider>
//       <RestOfApp objectPrimaryKey={new ObjectId()} />
//     </RealmProvider>
//   );
// }

// type RestOfAppProps = {
//   objectPrimaryKey: Realm.BSON.ObjectId;
// };

// const RestOfApp = ({ objectPrimaryKey }: RestOfAppProps) => {
//   const [selectedProfileId, setSelectedProfileId] = useState(objectPrimaryKey);
//   const realm = useRealm();

//   const addProfile = (name: string) => {
//     realm.write(() => {
//       realm.create('Profile', {
//         name: name,
//         _id: new Realm.BSON.ObjectId(),
//       });
//     });
//   };

//   const changeProfileName = (profile: Profile, newName: string) => {
//     realm.write(() => {
//       profile.name = newName;
//     });
//   };

//   const deleteProfile = (profile: Profile) => {
//     realm.write(() => {
//       realm.delete(profile);
//     });
//   };

//   return (
//     <View>
//       <Button title="Add Profile" onPress={() => addProfile('John Doe')} />
//     </View>
//   );
// };

// export default AppWrapper;


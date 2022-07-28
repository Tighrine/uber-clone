import { StyleSheet, TouchableOpacity, View } from 'react-native';
import tw from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import Map from '../../components/Map';
import RideOptionsCard from '../../components/RideOptionsCard';
import NavigateCard from '../../components/NavigateCard';

const MapScreen = ({ navigation }) => {

    const Stack = createNativeStackNavigator();

    return (
        <View>
            <TouchableOpacity 
                onPress={() => navigation.navigate('HomeScreen')}
                activeOpacity={0.7} 
                style={tw`z-50 absolute top-16 left-8 bg-gray-200 rounded-full p-3 shadow-lg`}>
                <Icon name='menu' />
            </TouchableOpacity>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='NavigateCard' component={NavigateCard} />
                    <Stack.Screen name='RideOptionsCard' component={RideOptionsCard} />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen;

const styles = StyleSheet.create({});
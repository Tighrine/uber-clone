import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from "twrnc";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { Icon } from "react-native-elements";
import NavFavourites from './NavFavourites';

const NavigateCard = ({ navigation }) => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Aghiles</Text>
            <View style={tw`flex-shrink border-t border-gray-200`}>
                <View>
                    <GooglePlacesAutocomplete
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                        placeholder='Where to ?'
                        styles={toInputBoxStyles}
                        minLength={2}
                        enablePoweredByContainer={false}
                        returnKeyType="search"
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }));
                            navigation.navigate('RideOptionsCard');
                        }}
                        fetchDetails={true}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en'
                        }}
                    />
                </View>
                <NavFavourites />
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RideOptionsCard')}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                >
                    <Icon type='font-awesome' name='car' color="white" size={16}/>
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full`}>
                    <Icon type='ionicon' name='fast-food-outline' color="black" size={16}/>
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: "white",
        paddingTop: 20
    },
    textInput: {
        fontSize: 18,
        borderRadius: 0,
        backgroundColor: "#DDDDDF"
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
});
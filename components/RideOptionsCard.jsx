import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import { useEffect } from 'react';

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {

  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const [selected, setSelected] = useState(null);

  return (
    <View style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[tw`absolute top-3 left-5 p-3 rounded-full`, { zIndex: 100 }]}
          activeOpacity={0.5}
        >
          <Icon type='font-awesome' name='chevron-left' size={15} />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl py-5`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${item.id === selected?.id && "bg-gray-200"}`}
          >
            <Image 
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
              source= {{
                uri: item.image
              }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`} >{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              €{((travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier)/100).toPrecision(4)}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
        <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import tw from "twrnc";
import { selectDestination, selectOrigin, selectTravelTimeInformation, setTravelTimeInformation } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useEffect, useRef } from 'react';
import { useIsFocused, useFocusEffect, use } from '@react-navigation/native';


const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    let mapRef = useRef(null);
    const dispatch = useDispatch();


    useFocusEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, left: 50, bottom: 50 }
        }, true);
        return () => mapRef = null;
    });

    

    useFocusEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            const URL = encodeURI(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
            const data = await (await fetch(URL)).json();

            dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        }

        getTravelTime();

    });

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            provider={PROVIDER_GOOGLE}
            mapType='mutedStandard'
            region={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >

            {origin && destination && (
                <MapViewDirections
                    destination={destination.description}
                    origin={origin.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    )
}

export default Map;
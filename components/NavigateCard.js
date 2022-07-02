import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<Text style={tw`text-center py-5 text-xl`}>Good Morning, Sagar</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<View>
					<GooglePlacesAutocomplete
						styles={toInputBoxStyles}
						query={{
							key: GOOGLE_MAPS_APIKEY,
							language: "en",
							// components: 'country:gh',
						}}
						onPress={(data, details = null) => {
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description,
								})
							);

							// Navigate user to RideOption pagge
							navigation.navigate("RideOptionsCard");
						}}
						minLength={2}
						returnKeyType={"search"}
						fetchDetails={true}
						nearbyPlacesAPI='GooglePlacesSearch'
						debounce={400}
						placeholder='Where to ?'
						enablePoweredByContainer={false}
					/>
				</View>
				<NavFavourites />
			</View>
			<View
				style={tw`flex-row bg-white justify-evenly py-2 border-t border-gray-100`}
			>
				<TouchableOpacity
					style={tw`flex flex-row bg-black justify-between w-24 px-4 py-3 rounded-full`}
					onPress={() => navigation.navigate("RideOptionsCard")}
				>
					<Icon name='car' type='font-awesome' color='white' size={16} />
					<Text style={tw`text-white text-center`}>Rides</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex flex-row  justify-between w-24 px-4 py-3 rounded-full`}
				>
					<Icon
						name='fast-food-outline'
						type='ionicon'
						color='black'
						size={16}
					/>
					<Text style={tw`text-center`}>Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingTop: 20,
		flex: 0,
	},
	textInput: {
		backgroundColor: "#DDDDDF",
		borderRadius: 0,
		fontSize: 18,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
});

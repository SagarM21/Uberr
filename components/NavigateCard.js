import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	return (
		<View>
			<SafeAreaView style={tw`flex-1 bg-white`}>
				<Text style={tw`text-center py-5 text-xl`}>Good Morning, Sagar</Text>
				<View style={tw`border-t border-gray-200 flex-shrink`}>
					<View>
						<GooglePlacesAutocomplete
							placeholder='Where To?'
							debounce={400}
							styles={toInputBoxStyles}
							enablePoweredByContainer={false}
							query={{
								key: GOOGLE_MAPS_APIKEY,
								language: "en",
							}}
							onPress={(data, details = null) => {
								dispatch(
									setDestination({
										location: details.geometry.location,
										description: data.description,
									})
								);
								navigation.navigate("RideOptionsCard");
							}}
							nearbyPlacesAPI='GooglePlacesSearch'
							returnKeyType={"search"}
							minLength={2}
						/>
					</View>
				</View>
			</SafeAreaView>
		</View>
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

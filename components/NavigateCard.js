import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={tw`bg-white flex-1`}>
      <Text style={tw`text-center text-xl py-5`}>Good Morning!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <GooglePlacesAutocomplete
          placeholder="Put in your destination"
          styles={toInputBoxStyles}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          query={{
            key: GOOGLE_MAP_APIKEY,
            language: "en",
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          returnKeyType={"search"}
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
            navigation.navigate("RideOptionCard");
          }}
        />
        <NavFavorites />
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-3 items-center py-2 mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`flex flex-row justify-between bg-black w-24 py-3 px-4 rounded-full`}
          onPress={()=> navigation.navigate('RideOptionCard')}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between bg-black w-24 py-3 px-4 rounded-full`}
        >
          <Icon name="fast-food-outline" type="ionicon" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Ride</Text>
        </TouchableOpacity>
      </View>
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

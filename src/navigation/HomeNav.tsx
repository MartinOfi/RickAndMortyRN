import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CharScreen from "../screens/CharScreen";
import EpiScreen from "../screens/EpiScreen";
import HomeScreen from "../screens/HomeScreen";
import LocScreen from "../screens/LocScreen";

const HomeNav = createStackNavigator({
  Home: { screen: HomeScreen },
  Characters: { screen: CharScreen },
  Locations: { screen: LocScreen },
  Episodes: { screen: EpiScreen },
});

export default createAppContainer(HomeNav);

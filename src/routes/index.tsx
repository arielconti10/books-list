import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../pages/Home";
import List, { Book } from "../pages/List";
// import NewList from "../pages/List/newlist";
import Detail from "../pages/Detail";

export type RouteParams = {
  Home: undefined;
  List: { search: string}
  Details: { data: Book }
}

const Routes: React.FC = () => {
  const Routes = createStackNavigator<RouteParams>();

  return (
    <Routes.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffe208" },
      }}
    >
      <Routes.Screen name="Home" component={Home} />
      <Routes.Screen name="List" component={List} initialParams={{ search: '' }}/>
      <Routes.Screen name="Details" component={Detail} initialParams={{ data: undefined }}/>
      {/* <Routes.Screen name="NewList" component={NewList} /> */}
    </Routes.Navigator>
  );
};

export default Routes;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../pages/Home";
import List from "../pages/List";
// import NewList from "../pages/List/newlist";
import Detail from "../pages/Detail";

const Routes: React.FC = () => {
  const Routes = createStackNavigator();

  return (
    <Routes.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffe208" },
      }}
    >
      <Routes.Screen name="Home" component={Home} />
      <Routes.Screen name="List" component={List} />
      <Routes.Screen name="Details" component={Detail} />
      {/* <Routes.Screen name="NewList" component={NewList} /> */}
    </Routes.Navigator>
  );
};

export default Routes;

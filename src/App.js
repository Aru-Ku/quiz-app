import React from "react";
import { Switch, Route } from "react-router-dom";
// COMPONENTS
import Home from "./components/home";

// UTILS
// import { useAuth } from "./utils/auth";
// import theme from "./utils/theme";

function App() {
	return (
		<Switch>
			<Route path='/' component={Home} />
		</Switch>
	);
}

export default App;

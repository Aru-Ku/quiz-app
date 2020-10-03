import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: process.env.REACT_APP_FB_API,
	authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_FB_DBURL,
	projectId: process.env.REACT_APP_FB_PID,
	storageBucket: process.env.REACT_APP_FB_SB,
	messagingSenderId: process.env.REACT_APP_FB_MSID,
	appId: process.env.REACT_APP_FB_APPID,
};

firebase.initializeApp(config);

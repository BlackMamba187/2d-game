import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyDqbdhprSZIhrp0Zhn2T6waRtNU94GapCA",

	authDomain: "dgame-a54f6.firebaseapp.com",

	databaseURL: "https://dgame-a54f6-default-rtdb.firebaseio.com",

	projectId: "dgame-a54f6",

	storageBucket: "dgame-a54f6.appspot.com",

	messagingSenderId: "863697460406",

	appId: "1:863697460406:web:f71f5eeb9d54e541cada17",

	measurementId: "G-PK37LYME2G",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const real_db = getDatabase(app);

export { auth, db, real_db };

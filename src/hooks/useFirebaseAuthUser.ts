import { useEffect, useState } from "react";
import firebase from "services/firebase";

export default function useFirebaseAuthUser() {
  const [authUser, setAuthUser] = useState(firebase.auth().currentUser);

  useEffect(() => firebase.auth().onAuthStateChanged(setAuthUser), []);

  return authUser;
}

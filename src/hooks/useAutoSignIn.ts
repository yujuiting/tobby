import { QueryStatus } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useDispatch } from "store";
import { useSignInMutation } from "store/api";
import * as userActions from "store/user";
import useFirebaseAuthUser from "./useFirebaseAuthUser";

export default function useAutoSignIn() {
  const dispatch = useDispatch();

  const authUser = useFirebaseAuthUser();

  const [signIn, signInResponse] = useSignInMutation();

  useEffect(() => {
    if (!authUser) return;

    (async () => {
      const idToken = await authUser.getIdToken();

      await signIn(idToken);
    })();
  }, [authUser]);

  useEffect(() => {
    if (signInResponse.status === QueryStatus.fulfilled) {
      dispatch(userActions.signedIn(signInResponse.data.userInfo));
    }
  }, [signInResponse]);
}

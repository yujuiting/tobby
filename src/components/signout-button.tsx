import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import firebase from "services/firebase";
import { useDispatch } from "store";
import * as userActions from "store/user";

export default function SignOutButton() {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() =>
        firebase
          .auth()
          .signOut()
          .then(() => dispatch(userActions.signedOut()))
      }
    >
      Sign Out
    </Button>
  );
}

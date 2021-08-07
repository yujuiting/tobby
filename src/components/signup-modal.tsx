import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import firebase from "services/firebase";
import { useDispatch } from "store";
import { useSignUpMutation } from "store/api";
import { signedIn } from "store/user";

export default function SignInModal(props: Omit<ModalProps, "children">) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const canSubmit = !!email && !!password && !loading;

  const [signUp, signUpResult] = useSignUpMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (signUpResult.error) setError("sign in failed");
    if (signUpResult.data) dispatch(signedIn(signUpResult.data));
  }, [signUpResult]);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, [props.isOpen]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const credential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const emailIDToken = await credential.user.getIdToken();

      await signUp({ emailIDToken, phoneIDToken: "" });
    } catch (err) {
      setError(err.message || `${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={submit}>
          <ModalBody>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Box height={4} />
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <FormControl isInvalid={!!error}>
              <Button
                colorScheme="brand"
                isLoading={loading}
                disabled={!canSubmit}
                type="submit"
              >
                Sign In
              </Button>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

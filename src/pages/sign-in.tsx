import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import firebase from "services/firebase";
import { useDispatch } from "store";
import { useSignInMutation } from "store/api";
import { signedIn } from "store/user";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitted, errors },
  } = useForm<FormData>({ mode: "onChange" });

  const [error, setError] = useState("");

  const [signIn, signInResponse] = useSignInMutation();

  const dispatch = useDispatch();

  const { push } = useRouter();

  useEffect(() => {
    if (signInResponse.error) setError("sign in failed");
    if (signInResponse.data) {
      dispatch(signedIn(signInResponse.data.userInfo));
      push("/");
    }
  }, [signInResponse, push]);

  const submit = handleSubmit(async ({ email, password }, e) => {
    e.preventDefault();

    try {
      const credential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const idToken = await credential.user.getIdToken();

      await signIn(idToken);
    } catch (err) {
      setError(err.message || `${err}`);
    }
  });

  return (
    <Center width="100%" height="100%">
      <form onSubmit={submit}>
        <Stack spacing={8} width="320px">
          <FormControl id="email" isRequired isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "It's not a valid email address.",
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isRequired isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!error} textAlign="center">
            <Button
              isLoading={isSubmitting}
              disabled={!isValid || isSubmitting || isSubmitted}
              type="submit"
            >
              Sign In
            </Button>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Stack direction="row" alignItems="center">
            <Divider />
            <Text fontSize="sm">OR</Text>
            <Divider />
          </Stack>
          <FormControl textAlign="center">
            <NextLink href="/sign-up">
              <Button>Sign Up</Button>
            </NextLink>
          </FormControl>
        </Stack>
      </form>
    </Center>
  );
}

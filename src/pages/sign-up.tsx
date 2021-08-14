import { useRouter } from "next/router";
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import firebase from "services/firebase";
import { useDispatch } from "store";
import { useSignInMutation } from "store/api";
import * as userActions from "store/user";
import { useForm } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignIn() {
  const router = useRouter();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, isValid, isSubmitting, isSubmitted, errors },
  } = useForm<FormData>({ mode: "onChange" });

  const [signIn, signInResponse] = useSignInMutation();

  useEffect(() => {
    if (signInResponse.status === QueryStatus.fulfilled) {
      dispatch(userActions.signedIn(signInResponse.data.userInfo));
    }
    /**
     * @todo error handling
     */
  }, [signInResponse]);

  const submit = handleSubmit(async ({ email, password }) => {
    const credential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const { origin } = window.location;

    await credential.user.sendEmailVerification({
      url: `${origin}/email-verification`,
    });

    const idToken = await credential.user.getIdToken();

    await signIn(idToken);

    router.push("/email-verification");
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
                minLength: {
                  value: 8,
                  message: "At least 8 characters.",
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="confirm-password"
            isRequired
            isInvalid={!!errors.confirmPassword}
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: true,
                minLength: {
                  value: 8,
                  message: "At least 8 characters.",
                },
                pattern: {
                  value: new RegExp(`^${watch("password")}$`),
                  message: "Password are different.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            disabled={!isDirty || !isValid || isSubmitting || isSubmitted}
            isLoading={isSubmitting}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Center>
  );
}

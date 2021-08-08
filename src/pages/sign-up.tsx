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
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  PinInput,
  PinInputField,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import firebase, { setupInvisibleReCAPTCHA } from "services/firebase";
import { useDispatch } from "store";
import { useSignUpMutation } from "store/api";
import { signedIn } from "store/user";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting, isSubmitted, errors },
  } = useForm<FormData>({ mode: "onChange" });

  const [error, setError] = useState("");

  const [signUp, signUpResult] = useSignUpMutation();

  const dispatch = useDispatch();

  const { push } = useRouter();

  const [sendingPhoneNumber, setSendingPhoneNumber] = useState(false);

  const [phoneVerification, setPhoneVerification] =
    useState<firebase.auth.ConfirmationResult | null>(null);

  const [verifyingCode, setVerifyingCode] = useState(false);

  const [phoneIDToken, setPhoneIDToken] = useState("");

  useEffect(() => {
    if (signUpResult.error) setError("sign in failed");
    if (signUpResult.data) {
      dispatch(signedIn(signUpResult.data));
      push("/");
    }
  }, [signUpResult, push]);

  const submit = handleSubmit(async ({ email, password }, e) => {
    e.preventDefault();

    try {
      const credential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const emailIDToken = await credential.user.getIdToken();

      await signUp({ emailIDToken, phoneIDToken });
    } catch (err) {
      setError(err.message || `${err}`);
    }
  });

  async function sendCode() {
    setSendingPhoneNumber(true);
    try {
      const verifier = setupInvisibleReCAPTCHA("send-verification-code");
      const phonenumber = `+886${watch("phoneNumber")}`;
      const resp = await firebase
        .auth()
        .signInWithPhoneNumber(phonenumber, verifier);
      setPhoneVerification(resp);
    } finally {
      setSendingPhoneNumber(false);
    }
  }

  async function verifyCode(code: string) {
    if (!phoneVerification) return;
    setVerifyingCode(true);
    try {
      const resp = await phoneVerification.confirm(code);
      setPhoneIDToken(await resp.user.getIdToken());
    } finally {
      setVerifyingCode(false);
    }
  }

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
          <Divider />
          <FormControl isRequired isInvalid={!!errors.phoneNumber}>
            <FormLabel>Phone Number</FormLabel>
            <InputGroup id="phonenumber">
              <InputLeftAddon>+886</InputLeftAddon>
              <Input
                type="string"
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /^\d{6,10}$/,
                    message: "It's invalid phone number.",
                  },
                })}
              />
              <Button
                id="send-verification-code"
                marginLeft={2}
                onClick={sendCode}
                isLoading={sendingPhoneNumber}
                disabled={
                  sendingPhoneNumber ||
                  !watch("phoneNumber") ||
                  !!errors.phoneNumber
                }
              >
                Send
              </Button>
            </InputGroup>
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Verification Code</FormLabel>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <PinInput otp onComplete={verifyCode} isDisabled={!!phoneIDToken}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
              <Spinner visibility={verifyingCode ? "visible" : "hidden"} />
            </Stack>
          </FormControl>
          <Divider />
          <FormControl isInvalid={!!error} textAlign="center">
            <Button
              isLoading={isSubmitting}
              disabled={
                !isValid || !phoneIDToken || isSubmitting || isSubmitted
              }
              type="submit"
            >
              Sign Up
            </Button>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        </Stack>
      </form>
    </Center>
  );
}

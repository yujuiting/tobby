import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Center, Stack } from "@chakra-ui/layout";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  PinInput,
  PinInputField,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useFirebaseAuthUser from "hooks/useFirebaseAuthUser";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import firebase, { setupInvisibleReCAPTCHA } from "services/firebase";
import { usePhoneMutation } from "store/api";

export default function PhoneVerification() {
  const router = useRouter();

  const user = useUser();

  const [confirmationResult, setConfirmationResult] =
    useState<firebase.auth.ConfirmationResult>();

  const [idToken, setIdToken] = useState<string>();

  const [phone, phoneResponse] = usePhoneMutation();

  useEffect(() => {
    if (user.phone) router.replace("/");
  }, [user, router.replace]);

  useEffect(() => {
    if (user && idToken) phone({ accessToken: user.accessToken, idToken });
  }, [user, idToken, phone]);

  function render() {
    if (phoneResponse.isSuccess) {
      return <PhoneVerified />;
    }

    if (confirmationResult) {
      return (
        <EnterCode
          confirmationResult={confirmationResult}
          onSuccess={setIdToken}
        />
      );
    }

    return <EnterPhoneNumber onSuccess={setConfirmationResult} />;
  }

  return (
    <Center width="100%" height="100%">
      {render()}
    </Center>
  );
}

interface EnterPhoneNumberProps {
  onSuccess: (confirmationResult: firebase.auth.ConfirmationResult) => void;
}

function EnterPhoneNumber({ onSuccess }: EnterPhoneNumberProps) {
  const authUser = useFirebaseAuthUser();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, isSubmitted },
  } = useForm<{ phoneNumber: string }>({ mode: "onChange" });

  const submit = handleSubmit(async ({ phoneNumber }) => {
    const verifier = setupInvisibleReCAPTCHA("send-verification-code");
    const confirmationResult = await authUser.linkWithPhoneNumber(
      `+886${phoneNumber}`,
      verifier
    );
    onSuccess(confirmationResult);
  });

  return (
    <form onSubmit={submit}>
      <Stack>
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon>+886</InputLeftAddon>
            <Input
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /^\d{6,10}$/,
                  message: "It's invalid phone number.",
                },
              })}
            />
          </InputGroup>
        </FormControl>
        <Button
          id="send-verification-code"
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting || isSubmitted}
          isLoading={isSubmitting}
        >
          Send Code
        </Button>
      </Stack>
    </form>
  );
}

interface EnterCodeProps {
  confirmationResult: firebase.auth.ConfirmationResult;
  onSuccess: (idToken: string) => void;
}

function EnterCode({ confirmationResult, onSuccess }: EnterCodeProps) {
  const [verifying, setVerifying] = useState(false);

  async function verify(code: string) {
    setVerifying(true);
    try {
      const credential = await confirmationResult.confirm(code);
      onSuccess(await credential.user.getIdToken());
      debugger;
    } catch (error) {
      console.error(error);
    } finally {
      setVerifying(false);
    }
  }

  return (
    <Center>
      <Stack direction="row">
        <PinInput otp onComplete={verify} isDisabled={verifying}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </Stack>
      {verifying && <Spinner />}
    </Center>
  );
}

function PhoneVerified() {
  return <Text>Your phone number has been verified</Text>;
}

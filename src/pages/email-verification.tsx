import { Button, Center, Stack, Text } from "@chakra-ui/react";
import useFirebaseAuthUser from "hooks/useFirebaseAuthUser";
import { useEffect } from "react";
import { useState } from "react";
import { useEmailVerifiedMutation } from "store/api";

export default function EmailVerification() {
  const authUser = useFirebaseAuthUser();

  return (
    <Center width="100%" height="100%">
      {authUser?.emailVerified ? <EmailVerified /> : <EmailUnverified />}
    </Center>
  );
}

function EmailVerified() {
  const authUser = useFirebaseAuthUser();

  const [emailVerified] = useEmailVerifiedMutation();

  useEffect(() => {
    if (authUser.emailVerified) {
      (async () => {
        await emailVerified(await authUser.getIdToken());
      })();
    }
  }, [authUser, emailVerified]);

  return <Text>Your email has been verified.</Text>;
}

function EmailUnverified() {
  const authUser = useFirebaseAuthUser();

  const [sendingEmail, setSendingEmail] = useState(false);

  async function sendEmailVerification() {
    const { origin } = window.location;

    setSendingEmail(true);

    try {
      await authUser.sendEmailVerification({
        url: `${origin}/email-verification`,
      });
    } finally {
      setSendingEmail(false);
    }
  }

  return (
    <Stack>
      <Text>You have to verify your email.</Text>
      <Button onClick={sendEmailVerification} isLoading={sendingEmail}>
        Verify My Email
      </Button>
    </Stack>
  );
}

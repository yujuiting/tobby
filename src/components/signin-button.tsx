import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

export default function SignInButton() {
  return (
    <NextLink href="/sign-in">
      <Button>Sign In</Button>
    </NextLink>
  );
}

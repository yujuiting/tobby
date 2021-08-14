import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "./useUser";

export default function useEnsureUserVerified() {
  const user = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    if (!user.emailVerified) {
      const path = "/email-verification";
      if (router.pathname !== path) router.push(path);
    } else if (!user.phone) {
      const path = "/phone-verification";
      if (router.pathname !== path) router.push(path);
    }
  }, [user, router]);
}

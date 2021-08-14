import { useSelector } from "store";

export default function useUser() {
  return useSelector((store) => store.user.userInfo);
}

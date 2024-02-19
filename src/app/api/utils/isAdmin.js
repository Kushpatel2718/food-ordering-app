import { UserInfo } from "@/app/models/UserInfo";
import { authOptions } from "../utils/authOptions";
import { getServerSession } from "next-auth";
export async function isAdmin() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

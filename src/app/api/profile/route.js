import mongoose from "mongoose";
import { User } from "../../models/User";
import { UserInfo } from "../../models/UserInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  //const { name, ...otherUserInfo } = data;
  // const session = await getServerSession(authOptions);
  // console.log(session);
  // console.log(data);
  // const email = session?.user?.email;
  // await User.updateOne({ email }, name);
  // await UserInfo.updateOne({ email }, otherUserInfo);

  // return Response.json(true);
  // const data = await req.json();
  const { _id, userName, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }
  console.log(filter);
  const user = await User.findOne(filter);
  console.log(user);
  await User.updateOne(filter, { userName });
  await User.updateOne(filter, { image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  // const email = session?.user?.email;
  // if (!email) {
  //   Response.json({});
  // }
  // const user = await User.findOne({ email });
  // const userInfo = await UserInfo.findOne({ email });
  // console.log(userInfo);
  // console.log(user);
  // return Response.json({ ...user, ...userInfo });

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }

  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return Response.json({ ...user, ...userInfo });
}

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../libs/mongoConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const email = credentials?.email;
        const password = credentials?.password;
        console.log(email);
        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        if (user) {
          return user;
          alert("successfully logged in");
        }
        // console.log(user);
        // const passwordOk = user && bcrypt.compareSync(password, User.password);

        // console.log({ passwordOk });
        // if (passwordOk) {
        //   return user;
        // }
        // return null;
      },
    }),
  ],
};

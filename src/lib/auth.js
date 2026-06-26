import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("assignment-9");

export const auth = betterAuth({
    database: mongodbAdapter(db, {

        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 5 * 24 * 60 * 60
        }
    },
    plugins: [
        jwt(),
    ]
});
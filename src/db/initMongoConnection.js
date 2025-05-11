import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async () => {
    const [user, pwd, url, db] = [
        getEnvVar("MONGODB_USER"),
        getEnvVar("MONGODB_PASSWORD"),
        getEnvVar("MONGODB_URL"),
        getEnvVar("MONGODB_DB")
    ];

    await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=scmongo`);
}
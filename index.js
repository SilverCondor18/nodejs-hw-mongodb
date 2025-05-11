import { setupServer } from "./src/server.js";
import { initMongoConnection } from "./src/db/initMongoConnection.js";

const bootstrap = async () => {
    try {
        await initMongoConnection();
        console.log("Mongo connection successfully established!");
        setupServer();
    }
    catch(err) {
        console.log(err.message);
    }
};

bootstrap();
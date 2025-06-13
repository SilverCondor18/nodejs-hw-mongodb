import { setupServer } from "./src/server.js";
import { initMongoConnection } from "./src/db/initMongoConnection.js";
import { createDirIfNotExists } from "./src/utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./src/constants/index.js";

const bootstrap = async () => {
    try {
        await initMongoConnection();
        await createDirIfNotExists(TEMP_UPLOAD_DIR);
        await createDirIfNotExists(UPLOAD_DIR);
        console.log("Mongo connection successfully established!");
        setupServer();
    }
    catch(err) {
        console.log(err.message);
    }
};

bootstrap();
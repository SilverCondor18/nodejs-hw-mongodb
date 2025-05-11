import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultValue) {
    const value = process.env[name];
    if(value) {
        return value;
    }

    return defaultValue;
}
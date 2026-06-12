import config from '../data/json/config.json';
import dotenv from 'dotenv';

dotenv.config();

interface ConfigEnvironment {
    base_url: string;
    username: string;
    password: string;
    browser?: string;
}

interface ConfigFile {
    [key: string]: ConfigEnvironment;
}

const env: string = process.env.ENV ?? process.env.environment ?? 'DEV';

export function getBaseUrl(): string {
    return (config as ConfigFile)[env].base_url;
}

export function getUsername(): string {
    return (config as ConfigFile)[env].username;
}

export function getPassword(): string {
    return (config as ConfigFile)[env].password;
}

export function getBrowser(): string | undefined {
    return (config as ConfigFile)[env].browser;
}
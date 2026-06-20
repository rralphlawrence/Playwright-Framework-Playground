import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface ConfigEnvironment {
    base_url: string;
    username?: string;
    password?: string;
    browser?: string;
}

interface ConfigFile {
    [key: string]: ConfigEnvironment;
}

const env: string = process.env.ENV ?? process.env.environment ?? 'STG';

// Use fs.readFileSync to avoid TypeScript resolveJsonModule inconsistencies
// that can occur between local and CI environments
const configPath = path.resolve(process.cwd(), 'data/json/config.json');
const config: ConfigFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

export function getBaseUrl(): string {
    const envConfig = (config as ConfigFile)[env];
    if (!envConfig) {
        throw new Error(`Environment "${env}" not found in config.json. Available environments: ${Object.keys(config).join(', ')}`);
    }
    return envConfig.base_url;
}

export function getUsername(): string {
    // Try environment variable first (e.g., STG_USERNAME, DEV_USERNAME, PROD_USERNAME)
    const envUsername = process.env[`${env}_USERNAME`];
    if (envUsername) {
        return envUsername;
    }
    // Fallback to config.json
    const envConfig = (config as ConfigFile)[env];
    return envConfig?.username ?? '';
}

export function getPassword(): string {
    // Try environment variable first (e.g., STG_PASSWORD, DEV_PASSWORD, PROD_PASSWORD)
    const envPassword = process.env[`${env}_PASSWORD`];
    if (envPassword) {
        return envPassword;
    }
    // Fallback to config.json
    const envConfig = (config as ConfigFile)[env];
    return envConfig?.password ?? '';
}

export function getBrowser(): string | undefined {
    const envConfig = (config as ConfigFile)[env];
    return envConfig?.browser;
}
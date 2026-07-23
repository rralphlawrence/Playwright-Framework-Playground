import config from '../data/json/config.json';
import dotenv from 'dotenv';

dotenv.config();

interface ConfigEnvironment {
    base_url: string;
    username?: string;
    password?: string;
    lockout_username?: string;
    lockout_password?: string;
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
    // Try environment variable first (e.g., STG_USERNAME, DEV_USERNAME, PROD_USERNAME)
    const envUsername = process.env[`${env}_USERNAME`];
    if (envUsername) {
        return envUsername;
    }
    // Fallback to config.json
    return (config as ConfigFile)[env].username ?? '';
}

export function getPassword(): string {
    // Try environment variable first (e.g., STG_PASSWORD, DEV_PASSWORD, PROD_PASSWORD)
    const envPassword = process.env[`${env}_PASSWORD`];
    if (envPassword) {
        return envPassword;
    }
    // Fallback to config.json
    return (config as ConfigFile)[env].password ?? '';
}

export function getLockoutUsername(): string {
    // Try environment variable first (e.g., STG_LOCKOUT_USERNAME, DEV_LOCKOUT_USERNAME, PROD_LOCKOUT_USERNAME)
    const envLockoutUsername = process.env[`${env}_LOCKOUT_USERNAME`];
    if (envLockoutUsername) {
        return envLockoutUsername;
    }
    // Fallback to config.json
    return (config as ConfigFile)[env].lockout_username ?? '';
}

export function getLockoutPassword(): string {
    // Try environment variable first (e.g., STG_LOCKOUT_PASSWORD, DEV_LOCKOUT_PASSWORD, PROD_LOCKOUT_PASSWORD)
    const envLockoutPassword = process.env[`${env}_LOCKOUT_PASSWORD`];
    if (envLockoutPassword) {
        return envLockoutPassword;
    }
    // Fallback to config.json
    return (config as ConfigFile)[env].lockout_password ?? '';
}

export function getBrowser(): string | undefined {
    return (config as ConfigFile)[env].browser;
}

import config from '../data/json/config.json'
import dotenv from 'dotenv'

dotenv.config()

if(process.env.ENV == null){
    var env = process.env.environment;

}else{
    var env = process.env.ENV;
}

export function getBaseUrl(){
    return config[env].base_url;
}

export function getUsername(){
    return config[env].username;
}

export function getPassword(){
    return config[env].password;
}

export function getBrowser(){
    return config[env].browser;
}

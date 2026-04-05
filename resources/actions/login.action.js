import { getUsername, getPassword } from "../../dataobjects/config"; 
import * as LoginPage from "../../page/login.page";
import CommonActions from './common.actions'


class LoginAction extends CommonActions {

    constructor(page){
        super(page);
    }

    async loginUser(){
        await this.waitAndFill(LoginPage.LoginUsername, getUsername());
        await this.waitAndFill(LoginPage.LoginPassword, getPassword());
        await this.waitAndClick(LoginPage.LoginButton);
        
    }


}   
export default LoginAction;
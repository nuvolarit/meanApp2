import { Component, View } from "angular2/core";
import { AuthHelper } from "../AuthHelper/authHelper";

@Component({
    selector : "login"
})

@View({
    templateUrl: "src/login/view-login.html"
})

export class Login {
    private authHelper:AuthHelper;
    constructor(auth:AuthHelper) {
        this.authHelper = auth;
    }   
    
    login() {
        this.authHelper.login();    
    } 
}
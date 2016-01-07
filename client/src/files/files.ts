import { Component, View } from "angular2/core";
import { Http, Headers } from "angular2/http";

import { AuthHelper } from "../AuthHelper/authHelper";

@Component({
    selector : "files"   
})

@View({
    templateUrl : "src/files/view-files.html"    
})

export class Files {
    private files = [];
    constructor(http:Http, auth:AuthHelper) {
        http.get("https://graph.microsoft.com/v1.0/me/drive/root/children", {
            headers: new Headers({ "Authorization": "Bearer " + auth.access_token })
        })
        .subscribe(res => {
            if (res.status === 200) {
                this.files = res.json().value;    
            }
        })
    }    
}
import { Component, View } from "angular2/core";
import { Http, Headers } from "angular2/http";

@Component({
    selector: "articles"
})

@View({
    templateUrl: "src/articles/view-articles.html"
})

export class Articles {
    private articles = [];
    constructor(http: Http) {
        http.get("http://localhost:3000/api/articles") 
            .subscribe(res => {
                this.articles = res.json(); 
            });
    }
}
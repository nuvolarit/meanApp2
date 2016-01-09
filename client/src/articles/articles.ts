import { Component, View, OnInit, HostListener } from "angular2/core";
import { Http, Headers } from "angular2/http";
import { Pager } from "../Pager/pager";

@Component({
    selector: "articles",
    directives: [Pager],
    templateUrl: "src/articles/view-articles.html"
})

export class Articles implements OnInit {

    private http: Http;
    private articles = [];

    constructor(http: Http) {

        this.http = http;
    }

    ngOnInit() {

        this.navigateToPage(1);
    }

    navigateToPage(page: number) {
        
        this.http.get("http://localhost:3000/api/articles/" + page)
            .subscribe(res => {
                this.articles = res.json();
            });
    }
}
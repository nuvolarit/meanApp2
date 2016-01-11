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
    private page:number = 1;
    private maxPage:number = 1;

    constructor(http: Http) {

        this.http = http;
    }

    ngOnInit() {

        this.navigateToPage(this.page);
    }

    navigateToPage(page: number) {
        
        this.page = page;
        
        this.http.get("http://localhost:3000/api/articles/" + this.page)
            .subscribe(res => {
                this.maxPage = 3;
                this.articles = res.json().data;
            });
    }
}
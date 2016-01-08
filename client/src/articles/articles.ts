import { Component, View, OnInit } from "angular2/core";
import { Http, Headers } from "angular2/http";

@Component({
    selector: "articles"
})

@View({
    templateUrl: "src/articles/view-articles.html"
})

export class Articles implements OnInit {

    private http: Http;
    private articles = [];

    private page: number = 1;
    private maxPage: number = 10;

    constructor(http: Http) {

        this.http = http;
    }

    ngOnInit() {

        this.navigateToPage();
    }

    navigateToPage() {

        this.http.get("http://localhost:3000/api/articles/" + this.page)
            .subscribe(res => {
                this.articles = res.json();
            });
    }

    prevPage() {

        if (this.page === 1) { return; }
        this.page--;
        this.navigateToPage();
    }

    nextPage() {

        if (this.page === this.maxPage) { return; }
        this.page++;
        this.navigateToPage();
    }
}
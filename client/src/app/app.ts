import { Component, provide } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";
import {
    Router,
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy
} from "angular2/router";
import { HTTP_PROVIDERS } from "angular2/http";

import { AuthHelper } from "../AuthHelper/authHelper";
import { Login } from "../login/login";
import { Files } from "../files/files";
import { Articles } from "../articles/articles";

@Component({
    selector: "files-app",
    template: "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

@RouteConfig([
    { name: "Login", component: Login, path: "/login" }
    , { name: "Files", component: Files, path: "/files" }
    , { name: "Articles", component: Articles, path: "/articles" }
])

export class App {
    constructor(router:Router, auth:AuthHelper) {
        router.navigate(["/Articles"]);
        /*
        if (auth.access_token !== null) {
            router.navigate(["/Files"]);    
        } else {
            router.navigate(["/Login"]);
        }
        */
    }
}

bootstrap(App, [
        AuthHelper,
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: HashLocationStrategy })
    ]);

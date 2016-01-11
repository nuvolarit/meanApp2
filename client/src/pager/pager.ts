import { Component, View, Input, Output, EventEmitter } from "angular2/core";

@Component({
    selector: "pager"
})

@View({
    template: `
    <nav>
        <ul class="pager" (click)="pagerOnClick($event)">
            <li [class.disabled]="page === 1">
                <a href="#/">Previous</a>
            </li>
            <li [class.disabled]="page === maxPage">
                <a href="#/">Next</a>
            </li>
        </ul>
    </nav>
    `
})

export class Pager {

    private page: number = 1;

    @Output() change: EventEmitter<number> = new EventEmitter();
    @Input() maxPage:number;
    
    constructor() { }
    
    pagerOnClick(event: Event) {

        let button = (<HTMLElement>event.target);
        
        if (!button.parentElement.classList.contains("disabled")) {
            if (button.innerHTML === "Next") {
                if (this.page < this.maxPage) {
                    this.page++;
                }
            } else {
                if (this.page > 1) {
                    this.page--;
                }
            }
            this.change.emit(this.page);
        }

        return false;
    }
}

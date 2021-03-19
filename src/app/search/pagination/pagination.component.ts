import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() hasNextPage: boolean;
  @Input() hasPreviousPage: boolean;
  @Input() nextPage: number;
  @Input() previousPage: number;
  @Input() lastPage: number;
  @Output() paginationEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onPageClick(event) {
    let page = event.target.text;
    if(page == this.currentPage) return null

    if(page === "Next") page = this.nextPage
    if(page === "Previous") page = this.previousPage

    this.paginationEvent.emit(page);

  }

}

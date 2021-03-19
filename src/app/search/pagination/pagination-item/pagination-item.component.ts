import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.css']
})
export class PaginationItemComponent implements OnInit {
  @Input() pageNumber;

  constructor() { }

  ngOnInit(): void {
  }

}

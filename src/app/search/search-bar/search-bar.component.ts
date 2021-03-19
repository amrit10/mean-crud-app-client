import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, AfterViewInit {

  @ViewChild('search') searchInput : ElementRef; 
  @Output() searchInputEvent : EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        // tap(text => {
        //   // console.log(this.searchInput.nativeElement.value)
        // })
      )
      .subscribe(() => {
        // console.log(this.searchInput.nativeElement.value);
        const searchString = this.searchInput.nativeElement.value;
        this.searchInputEvent.emit(searchString);
      });
  }

}

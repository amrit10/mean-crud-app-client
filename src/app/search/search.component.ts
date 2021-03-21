import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  loadedEmployees = [];
  searchString = undefined;
  isFetching = false;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  lastPage: number;
  nextPage: number;
  previousPage: number;
  currentPage: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEmployees(null, null);
  }

  private fetchEmployees(search: string, page: string) {
    this.isFetching  = true;
    let URL;
    if(!page) page = '1';
    if(search && page) {
      URL = 'http://localhost:3000/getEmployees?search='+search + '&page=' + page;
    } else if(page && !search) {
      URL = 'http://localhost:3000/getEmployees?page='+page ;
    } else {
      URL = 'http://localhost:3000/getEmployees';
    }

    this.http.get(URL)
    .subscribe(employees => {
      this.loadedEmployees = employees['employees'];
      this.hasNextPage = employees['hasNextPage'];
      this.hasPreviousPage = employees['hasPreviousPage'];
      this.lastPage = employees['lastPage'];
      this.previousPage = employees['previousPage'];
      this.nextPage = employees['nextPage'];
      this.currentPage = employees['currentPage'];
      // this.loadedEmployees = this.loadedEmployees.dob.slice(0, 9); 
      this.loadedEmployees.forEach(employee => {
        employee.dob = employee.dob.slice(0, 10);
      })
      this.isFetching = false;
    })
  }

  onSearchHandler(searchString: string) {
    // fetch data
    this.searchString = searchString;
    this.fetchEmployees(searchString, null);
  }

  onDeleteEmployeeUp(employeeId: string) {

    // let loadedEmployees = [...this.loadedEmployees];
    // // console.log(loadedEmployees);
    // this.loadedEmployees = loadedEmployees.filter(employee => {
    //   return employee._id !== employeeId;
    // })
    // // this.fetchEmployees(this.searchString);

    this.fetchEmployees(this.searchString, this.currentPage.toString());

  }

  onPaginationEventhandler(page) {
    this.fetchEmployees(this.searchString, page);
  }

}

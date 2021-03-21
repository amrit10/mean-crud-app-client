import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class EmployeesService{

    constructor(private http: HttpClient){}

    fetchEmployees() {
        this.http.get('http://localhost:3000/getEmployees')
            .pipe(map(responseData => {
                const employeesArray = [];
                for(const key in responseData){
                    employeesArray.push(responseData[key]);
                }
                return employeesArray[0];
            }))
            .subscribe(employees => {
                // this.loadedEmployees = employees;
                console.log(employees)
            }) 
    }
}
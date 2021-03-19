import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() loadedEmployees: Employee[];
  @Output() deleteEmployeeEventUp: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteEmployee(employeeId : string) {
    this.deleteEmployeeEventUp.emit(employeeId);
  }

}

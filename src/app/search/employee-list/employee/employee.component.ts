import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() deleteEmployeeEvent: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onDeleteEmployee() {
    // delete emplpoyee
    const employeeId = this.employee['_id'];
    this.http.delete('http://localhost:3000/deleteEmployee/'+ employeeId)
      .subscribe(response => {
        this.deleteEmployeeEvent.emit(employeeId);
        this.toastr.info('Employee Removed!')
      })
  }

  onEditEmployee(event) {
    event.preventDefault();
    const URL = 'editEmployee/'+this.employee['_id'];
    this.router.navigate([URL], {relativeTo: this.route});
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  skills = ['Engineering', 'Marketing', 'Hippie', 'Evil', 'Management', 'Value Investing', 'Painting', 'Funny'  ];
  editEmployeeForm: FormGroup;
  loadedEmployee;
  currentEmployeeId;
  isEditing: boolean = false;
  @ViewChild('imageInput') imageInput: ElementRef;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  get skillsFormArray() {
    return this.editEmployeeForm.controls.skills as FormArray;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentEmployeeId = params['employeeId'];
      this.initForm();
    })
  }

  private initForm() {
    const employeeId = this.currentEmployeeId
    const URL = 'http://localhost:3000/getEmployee/'+employeeId;
    this.http.get(URL)
    .subscribe(employee => {
      const emp = employee['employee'];
      this.loadedEmployee = emp;

      this.editEmployeeForm = new FormGroup({
        'name': new FormControl(emp.name, Validators.required),
        'dob': new FormControl(new Date(emp.dob).toISOString().split('T')[0], Validators.required),
        'salary': new FormControl(emp.salary, Validators.required),
        'image': new FormControl(null),
        'skills': new FormArray([], Validators.required)
      });
  
      this.addCheckboxes();
      console.log(this.editEmployeeForm);

    })
  }

  private addCheckboxes() {
    this.skills.forEach((skill, i) => this.skillsFormArray.push(new FormControl(this.loadedEmployee.skills.includes(skill))));
  }

  upload(event) {
    const fileType = event.target.files[0].type;
    const fileSize = event.target.files[0].size;

    if(fileType !== "image/png" && fileType !== "image/jpeg" && fileType !== "image/jpg"){
      this.toastr.warning('Please upload a png or jpg file only');
      this.editEmployeeForm.value.image = null;
      this.imageInput.nativeElement.value = '';
      return null;
    }

    if(fileSize > 10 * 1024 * 1024){
      this.toastr.warning('File size > 10 MB', 'Please upload a smaller file');
      this.imageInput.nativeElement.value = '';
      this.editEmployeeForm.value.image = null;
      return null;
    }

    const file = event.target.files[0];
    this.editEmployeeForm.get('image').setValue(file);
  }

  onSubmit(employeeData) {
    // console.log(employeeData.dob);
    if(!this.editEmployeeForm.valid){
      this.toastr.warning('Please enter valid form details');
      return null;
    }
    var fd = new FormData();
    this.isEditing = true;

    let skills = [];
    for (let i = 0; i < this.skills.length; i++) {
      if(employeeData.skills[i]) skills.push(this.skills[i])
    }

    fd.append('dob',employeeData.dob);
    fd.append('name', employeeData.name);
    fd.append('salary', employeeData.salary);
    fd.append('image', employeeData.image);
    fd.append('skills', JSON.stringify(skills));
    fd.append('_id', this.currentEmployeeId);

    this.http.put('http://localhost:3000/editEmployee', fd)
      .subscribe(
        response => {
          this.router.navigate(['/']);
          this.isEditing = false;
          this.toastr.success('Employee Information Updated!');
        },
        error => {
          this.isEditing = false;
        }
      )
  }

  onDeleteEmployee() {
    // delete emplpoyee
    this.isEditing = true;
    const employeeId = this.currentEmployeeId;
    this.http.delete('http://localhost:3000/deleteEmployee/'+ employeeId)
      .subscribe(
        response => {
          // this.deleteEmployeeEvent.emit(employeeId);
          this.router.navigate(['/']);
          this.isEditing = false;
          console.log(response);
          this.toastr.info('Employee Removed!');

        },
        error => {
          this.isEditing = false;
          console.log(error);
        }
      )
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  skills = ['Engineering', 'Marketing', 'Hippie', 'Evil', 'Management', 'Value Investing', 'Painting', 'Funny'  ];
  addEmployeeForm: FormGroup;
  isSubmitting: boolean = false;
  @ViewChild('addImageInput') addImageInput: ElementRef;

  
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  get skillsFormArray() {
    return this.addEmployeeForm.controls.skills as FormArray;
  }

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'dob': new FormControl(null, Validators.required),
      'salary': new FormControl(null, Validators.required),
      'image': new FormControl(null, [Validators.required]),
      'skills': new FormArray([], Validators.required)
    });

    this.addCheckboxes();
  }



  private addCheckboxes() {
    this.skills.forEach(() => this.skillsFormArray.push(new FormControl(false)));
  }

  upload(event) {
    const fileType = event.target.files[0].type;
    const fileSize = event.target.files[0].size;

    if(fileType !== "image/png" && fileType !== "image/jpeg" && fileType !== "image/jpg"){
      this.toastr.warning('Please upload a png or jpg file only');
      this.addEmployeeForm.value.image = null;
      this.addImageInput.nativeElement.value = '';
      return null;
    }

    if(fileSize > 10 * 1024 * 1024){
      this.toastr.warning('File size > 10 MB', 'Please upload a smaller file');
      this.addImageInput.nativeElement.value = '';
      this.addEmployeeForm.value.image = null;
      return null;
    }

    const file = event.target.files[0];
    this.addEmployeeForm.get('image').setValue(file);
  }

  onSubmit(employeeData) {
    console.log(this.addEmployeeForm)
    if(!this.addEmployeeForm.valid) {
      this.toastr.warning('Please enter valid details in the form');
      return null;
    }
    // console.log(employeeData.dob);
    var fd = new FormData();
    this.isSubmitting = true;

    let skills = [];
    for (let i = 0; i < this.skills.length; i++) {
      if(employeeData.skills[i]) skills.push(this.skills[i])
    }

    fd.append('dob',employeeData.dob);
    fd.append('name', employeeData.name);
    fd.append('salary', employeeData.salary);
    fd.append('image', employeeData.image);
    fd.append('skills', JSON.stringify(skills));

    this.http.post('http://localhost:8080/addEmployee', fd)
      .subscribe(
        response => {
          this.router.navigate(['/']);
          this.isSubmitting = false;
          this.toastr.success('Employee Added!');
        },
        error => {
          this.isSubmitting = false;
        }
      )
  }

} 

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeComponent } from './search/employee-list/employee/employee.component';
import { EmployeeListComponent } from './search/employee-list/employee-list.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { PaginationComponent } from './search/pagination/pagination.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { PaginationItemComponent } from './search/pagination/pagination-item/pagination-item.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes:Routes = [
  {path: 'addEmployee', component: AddEmployeeComponent},
  {path: 'editEmployee/:employeeId', component: EditEmployeeComponent},
  {path: '', component: SearchComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    EmployeeListComponent,
    SearchBarComponent,
    PaginationComponent,
    EditEmployeeComponent,
    PaginationItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

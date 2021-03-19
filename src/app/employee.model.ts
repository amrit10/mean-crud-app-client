export class Employee {
    public name: string;
    public dob: Date;
    public photo: string;
    public salary: number; 
    public skills: string[]; 
    public eid: number;
    public employeeId: string;

    constructor(name: string, dob: Date, photo: string, skills: string[], salary: number, eid: number, employeeId: string) {
        this.name = name;
        this.dob = dob;
        this.photo = photo;
        this.salary = salary;
        this.skills = skills;
        this.eid = eid;
        this.employeeId = employeeId;
    } 
}
#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import colors from 'colors';
class Student {
    static idcounter = 10000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = Student.idcounter++;
        this.courses = [];
        this.balance = 1000;
    }
    enrollInCourse(course) {
        this.courses.push(chalk.yellowBright(course));
    }
    viewBalance() {
        console.log("*".repeat(60));
        console.log(`Balance for student ${chalk.red(this.name)} is : $${chalk.red(this.balance)}`);
        console.log("*".repeat(60));
    }
    payTuitionFees(fee) {
        this.balance -= fee;
        console.log("*".repeat(60));
        console.log(`$${chalk.greenBright(fee)} Fees paid for student ${chalk.greenBright(this.name)}`);
        console.log(`Remaining Balance : $${chalk.greenBright(this.balance)}`);
        console.log("*".repeat(60));
    }
    showStatus() {
        console.log("*".repeat(60));
        console.log(`Name: ${chalk.blueBright(this.name)}`);
        console.log(`ID: ${chalk.greenBright(this.id)}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${chalk.magenta(this.balance)}`);
        console.log("*".repeat(60));
    }
}
class Studentmanagement {
    students;
    constructor() {
        this.students = [];
    }
    addStudent(name) {
        let newStudent = new Student(name);
        this.students.push(newStudent);
        console.log("*".repeat(60));
        console.log(`Student ${chalk.magenta(name)} added, student ID: ${chalk.blueBright(newStudent.id)} `);
        console.log("*".repeat(60));
    }
    searchStudent(studentid) {
        return this.students.find(stud => stud.id === studentid);
    }
    enrollStudent(studentid, course) {
        let fdStudent = this.searchStudent(studentid);
        if (fdStudent) {
            fdStudent.enrollInCourse(course);
            console.log("*".repeat(60));
            console.log(`${chalk.yellowBright(fdStudent.name)} is enrolled in ${chalk.yellowBright(course)} successfully`);
            console.log("*".repeat(60));
        }
        else {
            console.log("please enter a correct student id");
        }
    }
    viewStudentBalance(studentid) {
        let fdStudent = this.searchStudent(studentid);
        if (fdStudent) {
            fdStudent.viewBalance();
        }
        else {
            console.log("please enter a correct student id");
        }
    }
    payStudentFee(studentid, amount) {
        let fdStudent = this.searchStudent(studentid);
        if (fdStudent) {
            fdStudent.payTuitionFees(amount);
        }
        else {
            console.log("please enter a correct student id");
        }
    }
    showStudentStatus(studentid) {
        let fdStudent = this.searchStudent(studentid);
        if (fdStudent) {
            fdStudent.showStatus();
        }
    }
}
async function management() {
    console.log("*".repeat(60));
    console.log(colors.random(`   \n\t   Student Management System  \n\t `));
    console.log("*".repeat(60));
    let system = new Studentmanagement();
    let condition = true;
    while (condition) {
        let answer = await inquirer.prompt([
            { name: "Option",
                type: "list",
                message: "select one option",
                choices: ["Add Student", "Enroll In Course", "View Balance", "Pay Tuition Fees", "Show Student Status", "Exit"]
            }
        ]);
        switch (answer.Option) {
            // add student.
            case "Add Student":
                let addName = await inquirer.prompt([
                    { name: "name",
                        type: "input",
                        message: "Enter student name"
                    }
                ]);
                system.addStudent(addName.name);
                break;
            // Enroll in course.
            case "Enroll In Course":
                let courseEnroll = await inquirer.prompt([
                    { name: "Id",
                        type: "number",
                        message: "Enter a student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name in which you want to enroll"
                    }
                ]);
                system.enrollStudent(courseEnroll.Id, courseEnroll.course);
                break;
            //View student balance.
            case "View Balance":
                let studentBalance = await inquirer.prompt([
                    { name: "Id",
                        type: "number",
                        message: "Enter a student ID"
                    }
                ]);
                system.viewStudentBalance(studentBalance.Id);
                break;
            // Pay student tuition fees.
            case "Pay Tuition Fees":
                let studentFee = await inquirer.prompt([
                    {
                        name: "Id",
                        type: "number",
                        message: "Enter a student ID"
                    },
                    {
                        name: "Amount",
                        type: "number",
                        message: "Enter a amount to pay tuition fees"
                    }
                ]);
                system.payStudentFee(studentFee.Id, studentFee.Amount);
                break;
            // Show  a Student Status
            case "Show Student Status":
                let studentStatus = await inquirer.prompt([
                    {
                        name: "Id",
                        type: "number",
                        message: "Enter a student ID"
                    }
                ]);
                system.showStudentStatus(studentStatus.Id);
                break;
            //
            case "Exit":
                condition = false;
                console.log(colors.america("*".repeat(60)));
                console.log(colors.rainbow("..............Thankyou................"));
                console.log(colors.america("*".repeat(60)));
                break;
        }
    }
}
management();

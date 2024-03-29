const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const idList = []
const teamMembers = []


const appMenu = () => {

    function buildTeam(){
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    }

  /* ---------------------------------------------*/


    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your Interns name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is your Intern's employee  id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email address?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school did your intern go to?"
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern);
            idList.push(answers.internId);
            // console.log(intern);
            createTeam();
        })
    }

      /* ---------------------------------------------*/

    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your Engineers name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's employee id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email address?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's Github name?"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
            // console.log(engineer);
            createTeam();
        })
    }

  /* ---------------------------------------------*/

    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "What team member would you like to add?",
                choices: [

                    "Engineer",
                    "Intern",
                    "I do not want to add anymore team members."
                ]

            }
        ]).then(userChoice => {
            if(userChoice.memberChoice === "Engineer"){
                addEngineer();
            } else if(userChoice.memberChoice === "Intern"){
                addIntern();
            } else {
                buildTeam();
            }
        })
    }

  /* ---------------------------------------------*/

    function createManager(){
        console.log("Please build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: 'managerName',
                message: "What is the team manager name?",
                validate: answer => {
                    if(answer !== ""){
                        return true
                    }
                    return "Please enter a name."
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the team manager's id?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email adress?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office telephone number?"
            },
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            console.log(manager);
            teamMembers.push(manager);
            idList.push(answers.managerId);
            createTeam();
        })
    }

    createManager();
}

appMenu();
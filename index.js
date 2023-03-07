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

const idList = [];
const teamMembers = [];

const appMenu = () => {

    function addEngineer() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: `What is the engineers's name`,
                },
                {
                    type: 'input',
                    name: 'id',
                    message: `What is the engineer's employee ID?`,
                },
                {
                    type: 'input',
                    name: 'email',
                    message: `What is the engineer's email address?`,
                },
                {
                    type: 'input',
                    name: 'imgSrc',
                    message: 'What is the img Src of the Engineer?',
                },
                {
                    type: 'input',
                    name: 'gitHub',
                    message: `What is the engineer's github profile name?`,
                },
            ])
            .then((val) => {
                const engineer = new Engineer(val.name, val.id, val.email, val.imgSrc, val.gitHub);
                console.table(engineer);
                teamMembers.push(engineer);
                addTeamMember();
            });
    }}
   /* ---------------------------------------------*/
   function addIntern() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `What is the Intern's name`,
            },
            {
                type: 'input',
                name: 'id',
                message: `What is the Intern's employee ID?`,
            },
            {
                type: 'input',
                name: 'email',
                message: `What is the Intern's email address?`,
            },
            {
                type: 'input',
                name: 'imgSrc',
                message: 'What is the img Src of the Intern?',
            },
            {
                type: 'input',
                name: 'school',
                message: `What school did the intern go to?`,
            },
        ])
        .then((val) => {
            const intern = new Intern(val.name, val.id, val.email, val.imgSrc, val.school);
            console.table(intern);
            teamMembers.push(intern);
            addTeamMember();
   });
}

/*-----------------------------------------------------*/




    function addManager() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of the team manager?',
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'Employee ID of the team manager?',
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Email address of the team manager?',
                },
                {
                    type: 'input',
                    name: 'imgSrc',
                    message: 'What is the imgSrc of the team manager?',
                },
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: 'What is the office number of the team manager?',
                },
            ])
            .then((val) => {
                const manager = new Manager(val.name, val.id, val.email, val.imgSrc, val.officeNumber);
                console.table(manager);
                teamMembers.push(manager);
                addTeamMember();
            });
    }
/*---------------------------------------------*/


function createTeam(){
    inquirer
    .prompt([
        {
            typeof: "list",
            name: "memberChoice",
            message: "What type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ],
        }]).then (userChoice => {
        if(userChoice.memberChoice === "Engineer"){
            //Add Engineer
            addEngineer ();
        } else if(userChoice.memberChoice === "Intern"){
            //Add Intern
            addIntern ();
        } else if(userChoice.memberChoice === "I don't want to add any more team members"){
        // NO more team members to add to the team
        } else{
            //build team
            createTeam ();
        }});
    }


function createManager() {
    console.log("Creating Manager");
    inquirer.prompt ([
        {
            typeof: "input",
            name: "managerName",
            message: "What is the manager's name?",
            validate: answer => {
                if(answer!== "") {
                    return true;
                }
                return "Please enter a name";
            }
        },

        {
            typeof: "input",
            name: "managerId",

        },

        {
            typeof: "input",
            name: "managerEmail",

        },
    



    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
        console.log(manager);
        teamMembers.push(manager);
        idList.push(answers.managerId);
        createTeam ();
        })
    
};

createManager();

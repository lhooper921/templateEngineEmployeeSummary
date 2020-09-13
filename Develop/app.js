const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "employees.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development employees members,
// and to create objects for each team member (using the correct classes as blueprints!)

// store employees in empty team memebrs array, global variables
let employees = []

function startApplication() {

  generateManager()
  function generateManager() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the Manager?",
          name: "name"
        },
        {
          type: "input",
          message: "What is the id of the Manager?",
          name: "id"
        },
        {
          type: "input",
          message: "What is the email address of the Manager?",
          name: "email"
        },
        {
          type: "input",
          message: "What is the office phone number of the Manager?",
          name: "officeNumber",

        }])
      .then((managerInput) => {
        let manager = new Manager(
          managerInput.name,
          managerInput.id,
          managerInput.email,
          managerInput.officeNumber,
        )
        employees.push(manager);
        employeeSelect()
      })



  };
  function employeeSelect() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What type of employee would you like to add?",
          name: "preference",
          choices: ["Engineer", "Intern", "No more Employees to add"]
        }
      ])
      .then((userInput) => {
        switch (userInput.preference) {
          case 'Engineer':
            generateEngineer();
            break;
          case 'Intern':
            generateIntern();
            break;
          
           
          default:
            console.log("Team complete!");
            renderWrite();
        }


      })
  }

  function generateEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of this Engineer?",
          name: "name"
        },
        {
          type: "input",
          message: "What is the id of this Engineer?",
          name: "id"
        },
        {
          type: "input",
          message: "What is the email address of this Engineer?",
          name: "email"
        },
        {
          type: "input",
          message: "What is the gitHub username of this Engineer?",
          name: "github",
        },

      ])
      // Use answers to create new Engineer object
      .then((engineerInput) => {
        let engineer = new Engineer(
          engineerInput.name,
          engineerInput.id,
          engineerInput.email,
          engineerInput.github,
        )

        // Add to the team array
        employees.push(engineer);
        

        // Ask user if they would like to add more employees
        employeeSelect()
      })
  }

  function generateIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of this Intern?",
          name: "name"
        },
        {
          type: "input",
          message: "What is the id of this Intern?",
          name: "id"
        },
        {
          type: "input",
          message: "What is the email address of this Intern?",
          name: "email"
        },
        {
          type: "input",
          message: "What is the school name of this Intern?",
          name: "school",
        },
        {
          type: "checkbox",
          message: "What type of employee would you like to add?",
          name: "preference",
          choices: ["Engineer", "Intern", "No more Employees to add"]
        }
      ])
           // Use answers to create new Engineer object
           .then((internInput) => {
            let intern = new Intern(
              internInput.name,
              internInput.id,
              internInput.email,
              internInput.school,
            )
    
            // Add to the team array
            employees.push(intern);
            
    
            // Ask user if they would like to add more employees
            employeeSelect()
          })

  }


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `employees.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
function renderWrite(){
//render(employees);
fs.writeFile(outputPath, render(employees), function(err) {
  if (err) {
    throw err;
  }

  console.log("Successfully wrote to employees.html file");
});
}}
// Initializes application
startApplication()

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

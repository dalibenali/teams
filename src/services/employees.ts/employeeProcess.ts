import Team from "models/Team";
import Employee from "models/Employee";
import db from "../../utils/db";

// processing of an employee to have a model corresponding
// to the http response cited in the specifications
let processEmployee = async (
  employee: Employee
): Promise<Array<Employee> | string> => {
  try {
    let team: [Team] = await db.pool.query(
      "SELECT id, name, description, created_at, updated_at FROM teams where id =?",
      [employee.team_id]
    );
    let newEmployee: any = {};
    newEmployee.id = employee.id;
    newEmployee.profile = {};
    newEmployee.profile.firstName = employee.firstName;
    newEmployee.profile.lastName = employee.lastName;
    newEmployee.email = employee.email;
    newEmployee.address = employee.address;
    newEmployee.registered = employee.registered;
    newEmployee.isActive = employee.isActive;
    newEmployee.team = {};
    Object.assign(newEmployee.team, team[0]);
    newEmployee.created_at = employee.isActive;
    newEmployee.updated_at = employee.updated_at;
    return newEmployee;
  } catch (error: any) {
    return error.message;
  }
};

export = processEmployee;

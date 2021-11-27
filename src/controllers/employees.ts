import { Request, Response, NextFunction } from "express";
import Employee from "../models/Employee";
import db from '../utils/db';
import employeeProcess from "../utils/services/employees.ts/employeeProcess";

// getting all employees
const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    let conn: any;
    let processedEmployeesArray : any[] = [];
    let processEmployee;
    try {
        let employees: [Employee] = await db.pool.query("SELECT * FROM employees");
        for (let employee of employees) { 
            processEmployee = await employeeProcess(employee); // call 
            processedEmployeesArray.push(processEmployee);
        };
        res.status(200).json(processedEmployeesArray);
        
    } catch (err) {
        console.log("====================>",err);
    } finally {
        if (conn) return conn.end();
    }
  };
// getting employee
const getEmployee = async (req: Request, res: Response, next: NextFunction) => {

    let conn: any;
    let id: string = req.params.id;
    try {
        let employee: [Employee] = await db.pool.query("SELECT * FROM employees where id ="+id);
        if (!employee.length) return res.status(404).json('employee not found');
        let processedEmployee = await employeeProcess(employee[0]); 
        res.status(200).json(processedEmployee);
    } catch (err) {
        console.log("====================+>",err);
    } finally {
        if (conn) return conn.end();
    }
};

// deleting employee
const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    
    let conn: any;
      try {
        let employeeId: any = req.params.id;
        await db.pool.query("DELETE FROM employees WHERE id = ?", [employeeId]);
        res.status(204).send();
      } catch (err) {
          console.log("====================+>",err);
      } finally {
          if (conn) return conn.end();
      }
  };

export default { getEmployees, getEmployee, deleteEmployee };

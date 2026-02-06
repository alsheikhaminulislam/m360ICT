import { employeeModel, CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeFilter } from "../models/Employee";

export { CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeFilter };

export const createEmployee = async (data: CreateEmployeeDTO) => {
    return employeeModel.create(data);
};

export const getEmployees = async (filter: EmployeeFilter) => {
    return employeeModel.findAll(filter);
};

export const getEmployeeById = async (id: number) => {
    return employeeModel.findByIdActive(id);
};

export const updateEmployee = async (id: number, data: UpdateEmployeeDTO) => {
    return employeeModel.updateWithTimestamp(id, data);
};

export const softDeleteEmployee = async (id: number) => {
    return employeeModel.softDelete(id);
};


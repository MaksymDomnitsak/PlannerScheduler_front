import { Group } from "./group";

export interface Student{
    id: number;
    firstName: string;
    lastName: string;
    patronymicName: string;
    email: string;
    phoneNumber: string;
    group: Group;
}
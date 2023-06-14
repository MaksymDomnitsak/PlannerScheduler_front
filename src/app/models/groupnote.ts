import { Schedule } from "./schedule";
import { Student } from "./student";

export class GroupNote{
    title: string = "";
    event: number;
    groups: number[] = [];
    students: number[] = [];
    body: string = "";

    constructor(title: string = "", eventId: number = 0, groups: number[] = [], students: number[], body: string = ""){
        this.title = title;
        this.event = eventId;
        this.groups = groups;
        this.students = students;
        this.body = body;
    }
}
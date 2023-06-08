import { Schedule } from "./schedule";
import { Student } from "./student";

export interface Note{
    id: number;
    title: string;
    lesson: Schedule;
    student: Student;
    body: string;
    finished: boolean;
}
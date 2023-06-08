import { Group } from "./group";
import { Subject } from "./subject";
import { User } from "./user";

export interface Schedule {
    id: number;
    customTitle: string;
    subject: Subject;
    creator: User;
    group: Group;
    dayOfWeek: number;
    evenWeek: boolean;
    lessonOrder: number;
    typeOfLesson: string;
    online: boolean;
    auditoryNumber: string;

  }
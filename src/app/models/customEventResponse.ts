export class CustomEventResponse {
    id!: number;
    customTitle!: string;
    subjectId!: number;
    creatorId!: number;
    attendees!: string[]; 
    groupId!: number;
    dayOfWeek!: number;
    isEvenWeek: boolean = false;
    lessonOrder!: number;
    typeOfLesson!: string;
    online!: boolean;
    auditoryNumber!: string;
    startTime!: string;
    endTime!: string;

        constructor(id: number,customTitle: string, subjectid: number = 0, creatorid: number, attendees: string[], groupid: number, dayOfWeek: number, lessonOrder: number = 0,
            typeOfLesson: string, online: boolean, auditoryNumber: string = "", startTime: string = "", endTime: string = ""){
                this.id = id;
                this.customTitle = customTitle;
                this.subjectId = subjectid;
                this.creatorId = creatorid;
                this.attendees = attendees;
                this.groupId = groupid;
                this.dayOfWeek = dayOfWeek;
                this.lessonOrder = lessonOrder;
                this.typeOfLesson = typeOfLesson;
                this.online = online;
                this.auditoryNumber = auditoryNumber;
                this.startTime = startTime;
                this.endTime = endTime;
            }
  }
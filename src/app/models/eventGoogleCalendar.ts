export class EventGoogleCalendar{
    summary: string = "";
    description: string = "";
    location: string = "";
    startDate: string = "";
    frequency: string = "";
    repeats: string = "";
    groupsId: number[] = [];
    attendeesEmails: string[] = [];
    conference: string = "";
    scheduleId: number = 0;

    constructor(summary: string = "",
    description: string = "",
    location: string = "",
    startDate: string = "",
    frequency: string = "",
    repeats: string = "",
    groups: number[] = [],
    attendees: string[] = [],
    conference: string = "",
    scheduleId: number = 0){
        this.summary=summary;
        this.description=description;
        this.location=location;
        this.startDate=startDate;
        this.frequency=frequency;
        this.repeats=repeats;
        this.groupsId=groups;
        this.attendeesEmails=attendees;
        this.conference=conference;
        this.scheduleId=scheduleId;
    }
}
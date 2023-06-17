import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ExtraUtils {

    constructor() { }

    floor(num: number): any{
        return Math.floor(num);
    }
      
    ceil(num: number): any{
        return Math.ceil(num);
    }

    getRange(start: number, end: number): number[] {
        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }
    
    startTimeFromNumber(order: number){
        switch (order){
            case 1: return "08:20:00";
            case 2: return "09:50:00";
            case 3: return "11:30:00";
            case 4: return "13:00:00";
            case 5: return "14:40:00";
            default: return "00:00:00";
        }
    }

    endTimeFromNumber(order: number){
        switch (order){
            case 1: return "09:40:00";
            case 2: return "11:10:00";
            case 3: return "12:50:00";
            case 4: return "14:20:00";
            case 5: return "16:00:00";
            default: return "00:00:00";
        }
    }
  
}
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
    
  
}
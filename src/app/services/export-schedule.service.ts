import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportScheduleService {

  constructor() { }

  exportSchedule() {
    const element: any = document.getElementById('schedule-table');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imgData;
      a.download = 'schedule.png';
      a.click();
    });
  }

  exportToPdf() {
    const data:any = document.getElementById('schedule-table');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = 0.80 * canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('schedule.pdf');
    });
  }

}

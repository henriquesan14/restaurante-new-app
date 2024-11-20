import { DatePipe } from "@angular/common";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";

export class DateUtils {

  static formatarData(dataString: string): string {
    const data = new Date(dataString);
    const diff = Date.now() - data.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? 'Um dia atrás' : `${days} dias atrás`;
    } else if (hours > 0) {
      return hours === 1 ? 'Há uma hora' : `Há ${hours} horas`;
    } else if (minutes > 0) {
      return minutes === 1 ? 'Há um minuto' : `Há ${minutes} minutos`;
    } else {
      return 'Agora mesmo';
    }
  }

  static setDataHora(dataISO: string, dp: NgbDatepicker, form: FormGroup, dateField: string, hourField: string) {
    const data = new Date(dataISO);
    const year = data.getFullYear();
    const month = data.getMonth() + 1;
    const day = data.getDate();

    dp.navigateTo({ year: year, month: month });

    form.get(dateField)?.setValue({
      year: year,
      month: month,
      day: day
    });

    form.get(hourField)?.setValue({
      hour: data.getHours(),
      minute: data.getMinutes(),
      second: data.getSeconds()
    });
  }

  static getDatetimeFormatted(form: FormGroup, dateField: string, hourField: string, diaInteiro: boolean){
    const formDate = form.get(dateField)?.value;
    const formTime= form.get(hourField)?.value;
    let date;
    if(diaInteiro){
      date = new Date(formDate.year, formDate.month - 1, formDate.day, 23, 59, 59);
    }else{
      date = new Date(formDate.year, formDate.month - 1, formDate.day, formTime.hour, formTime.minute);
    }
    
    const datePipe = new DatePipe('en-BR');
    const formattedDate = datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
    return formattedDate!;
  }
}
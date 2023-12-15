import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'choose'
})
export class ChoosePipe implements PipeTransform {

  transform(value: 'Y'|'N'|null): unknown { // parameter แรก ของ method tranform จะเป็นค่าที่ถูกส่งเข้ามาแปลง
   switch (value) {
    case 'Y': return 'ถูกเลือก'
      case 'N': return "ไม่เลือก"

    default: 
      return "-"
   }
  }

}

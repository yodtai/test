import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { PokemonChoose } from './interface-api/pokemon-interface';
import { BehaviorSubject, NEVER, switchMap } from 'rxjs';
import { useDragImage } from './shared/use-drag-image';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ReactiveForms';
  bmi = 0;
  info = '';

  weightForm = new FormControl(null, Validators.required); // parameter ช่องที่ 1 กำหนดค่าเริ่มต้นให้กับ component เป็น null parameter ช่องที่ 2 สร้างข้อกำหนดหรือ validation ด้วย Validators จากนั้น .ด้วยข้อกำหนดที่เราค้องการคือ required ก็คือต้องกรอกข้อมูลด้วยนะ
  heightForm = new FormControl(null, Validators.required);

  constructor() {}

  ngOnInit(): void {
    this.imageRef$.pipe(
      switchMap(ref=>{
        if(ref){ // ถ้าการอ้างอิงถึง element ด้วย viewchild มีค่า
          return useDragImage(ref.nativeElement)  //กำหนดให้ผูกกับ event
        }
        return NEVER; // ถ้าการอ้างอิงถึง element ด้วย viewchild ไม่มีค่า ก็ไม่ต้องทำอะไรเลยด้วย การ  return NEVER;
      })
    ).subscribe()
  }



  isShowImage=false;

  // A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9. BMI applies to most adults 18-65 years.

  calculate() {
    if (this.weightForm.invalid || this.heightForm.invalid) {
      return;
    }
    const weight = this.weightForm.value;
    const height = this.heightForm.value;
    console.log('weight', weight);
    console.log('height', height);
  
    if (weight != null && height != null) {
       this.bmi=weight/height**2;
    }
  }
  emailForm = new FormControl(null,[Validators.required,Validators.email]);


  idCardValidator:ValidatorFn = (control:FormControl)=>{ // สร้าง Validators

     const idCard:string|null =control.value; //ดึงค่าใน FormControl  ด้วยการดึงค่าที่กรอกจาก inputtext จาก FormControl ด้วย control.value เก็บในตัวแปร idCard

     if(idCard){ // เช็คว่ามีการกรอกข้อมูลเลขบัตร ปชช เข้ามาในฟอร์ฒของเราจริงหรือไม่

       if(idCard.length!==13){//ตรวจสอบว่าจำนวนตัวเลขบัตร ปชช มีจำนวน 13 ตัวหรือไม่ ถ้าไม่เท่ากับ 13 ตัว ก็คือ validate ไม่ผ่าน
         return {idCard:true} // object error = true = validate ไม่ผ่าน

       }
       
       let index=13;
       let sum=0;
       for(const num of idCard.substring(0,12)){ // loop ข้อมูลในตัวแปร idCard เพื่อ นำเลข 12 หลักแรกมาใช้
        if(isNaN(Number(num))){ // ตรวจสอบว่าค่าที่กรอกมาเป็นตัวเลขหรือตัวอักษรด้วย isNaN ถ้าเป็นตัวอักษรจะเป็น true ถ้าเป็นตัวเลขก็ false
          return {idCard:true} // object error = true = validate ไม่ผ่าน
        }
         sum+= Number(num)*index--; //นำเลข 12 หลักแรกมาคูณกับเลขประจำตำแหน่ง และเก็บผลรวมการคูณในแต่ละรอบ ในตัวแปร sum
       }

       const mod= sum%11; // นำผลรวมทั้งหมดมาหารเอาเศษด้วย  11

       const lastnumber = `${11-mod}`.slice(-1) //นำ 11 ตั้งแล้วลบเศษที่ได้ แล้วก็เอาหลักหน่วยเท่านั้นโดยใช้ .slice(-1) หรือก็คือเอาตัวอักษรตัวสุดท้ายนั่นแหละ

       if(idCard.charAt(12)!==lastnumber){ // ตรวจสอบว่า ตัวเลขตัวสุดท้ายของบัตร ปชช ที่ผู้ใช้กรอกเข้ามา ถ้า ไม่เท่ากับ เลขตัวสุดท้ายที่เราคำนวณ ก็จะ validate ไม่ผ่าน
        return {idCard:true} // object error = true = validate ไม่ผ่าน
       }

     }

    return null;
  }


  idCard = new FormControl(null, [
    Validators.required,this.idCardValidator]);

    active=true;


    // pokemon$ = of('pokemon');
  // test$ = combineLatest({ pokemon: this.pokemon$ }).subscribe((val) =>
  //   console.log(val)
  // );

  pokemonChooseList: PokemonChoose[] = [
    {
      id: 0,
      pokename: 'pikachu',
      choose: 'Y',
    },
    { id: 1, pokename: 'ditto', choose: 'N' },
    { id: 2, pokename: 'wobbuffet', choose: 'Y' },
    { id: 3, pokename: 'girafarig', choose: 'N' },
    { id: 4, pokename: 'forretress', choose: 'Y' },
  ];

  @ViewChild('boppinCodeImage',{read:ElementRef}) // parameter 1 กำหนดค่าให้ อ้างอิงถึง element ที่มีชื่อ boppinCodeImage
                                                  // parameter 2 กำหนดให้ viewChild อ่านค่าจาก element ที่อ้างอิง แบบประเภท Element ด้วย read:ElementRef
           set imageRef(el:ElementRef<HTMLImageElement>| undefined){// สามารถกำหนด Generic ได้ว่า element ที่เราอ้างอิงถึงเป็น element อะไร เช่น อ้างอิงถึง element รูปภาพใน html ก็จะเป็น HTMLImageElement
            this.imageRef$.next(el) // นำค่าที่ viewChild กำหนดให้มาทำการ next ค่าเข้าไปใน BehaviorSubject
           } 

           get imageRef(){
            return this.imageRef$.value
           }

       imageRef$ = new BehaviorSubject<ElementRef<HTMLImageElement>| undefined>(undefined) // BehaviorSubject คือ Subject ที่เริ่มต้นด้วยการปล่อย Item ตัวล่าสุด (most recent item) ที่ถูกปล่อยออกมาจาก Source Observable จากนั้นจึงค่อยปล่อย Item ที่เกิดขึ้นหลังจากการ subscribe ไปแล้วให้กับ Subscriber ตามปกติ ดังนั้นจะได้ค่าล่าสุดเสมอ ในที่นี้ค่าเริม่ต้นคือ undefined
           
    
           smallImage(){
            if(this.imageRef!==undefined){
              const imageElement = this.imageRef.nativeElement; //อ้างอิงถึง element image
              imageElement.style.width="100px";
            }
           }
           mediumImage(){
            if(this.imageRef!==undefined){
              const imageElement = this.imageRef.nativeElement; //อ้างอิงถึง element image
              imageElement.style.width="300px";
            }
            
           }
           bigImage(){
            if(this.imageRef!==undefined){
              const imageElement = this.imageRef.nativeElement; //อ้างอิงถึง element image
              imageElement.style.width="600px";
            }
            
           }

   
}

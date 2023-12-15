import { HttpClient } from '@angular/common/http';
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHttpBook]'
})
export class HttpBookDirective {
 @Output() appHttpBook = new EventEmitter;
  constructor(private http:HttpClient) { }

 /* เมื่อไรก็ตามที่ user พิมพ์ในช่อง input จะให้ Directive ทำการดัก event input นี้แทน เมื่อดักได้แล้วก็ให้เรียก method loadBook() */  
 @HostListener('input',['$event']) loadBook(event:any){
  const inputTextElement:HTMLInputElement= event.target; // กำหนดให้ตัวแปร inputTextElement มีค่าเท่ากับ element inputtext ที่อยู่ฝั่ง template

    this.http.get<any>('https://www.anapioficeandfire.com/api/books?name='+inputTextElement.value).subscribe(response=>this.appHttpBook.emit(response));
 }

}

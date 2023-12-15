import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reordering-list',
  templateUrl: './reordering-list.component.html',
  styleUrls: ['./reordering-list.component.scss']
})
export class ReorderingListComponent {
 
  duty=["วัคซีนที่มีประสิทธิภาพ","อาวุธ","โรงจำนำ"]
  done=["กู้","แจกเงิน"];

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  dropDuty(event: CdkDragDrop<string[]>){

  if(event.previousIndex === event.currentIndex){ // ถ้าสลับกันใน container เดียวกัน ก็ให้ทำ

    moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);  // ฟังก์ชัน moveItemInArray ใช้สลับตำแหน่ง array parameter ตัวที่ 1 ใช้บอกว่าจะสลับตำแหน่งข้อมูลใน array ตัวไหน หรือ ใช้ event.container.data เพื่อบอกว่าให้สลับกับตำแหน่งไหนก็ได้
                                                                        // parameter ตัวที่ 2 ตำแหน่งข้อมูลตัวที่เราลาก
                                                                        // parameter ตัวที่ 3 ตำแหน่งที่ต้องการวาง
  }else{ //ถ้า drag และ drop ข้าม container
    transferArrayItem(
      event.previousContainer.data, // parameter ตัวที่ 1 กำหนดจาก array ของ container ต้นทาง
      event.container.data, // parameter ตัวที่ 2 คือ array จาก container ปลายทาง ซึ่งก็คือตัวที่เรา drop ใส่นั่นแหละ
      event.previousIndex, //  parameter ตัวที่ 3 คือ index ของ array ต้นทาง
      event.currentIndex //  parameter ตัวที่ 4 คือ index ของ array ข้อมูลปลายทาง หรือ ตัวที่เรา drop ใส่

    )
  }

     }     
}

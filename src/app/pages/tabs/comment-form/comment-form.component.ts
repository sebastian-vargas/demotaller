import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonTextarea } from '@ionic/angular';
import { LessonService } from 'src/app/services/lesson.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
  }

  @Input() id_lesson: string;
  @Input() token: string;
  @Input() count: boolean;

  @Output("updateComments") updateComments: EventEmitter<any> = new EventEmitter();


  @ViewChild('comment') comment: IonTextarea;

  lessonSubscription: Subscription;

  characterCount = 0; 
  
  onInputComment(comment){

    if(comment.trim() == ""){
      this.comment.value = "";
    }
    this.characterCount = this.comment.value.length;
  }

  submit(event){
    event.preventDefault();
    let comment = this.comment.value;
    if(comment.length > 0 && comment.length <= 250){
      console.log(comment)
      
      this.lessonSubscription = this.lessonService.addComment(this.id_lesson, this.token, comment).subscribe((res:any) => {
        if(res.status && res.status == 200){
          this.comment.value = "";
          this.characterCount = 0;
          this.updateComments.emit();
        }
      });
    }
  }


}

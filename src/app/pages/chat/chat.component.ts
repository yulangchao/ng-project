import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat {
  items: any;
  room: any = 'all';
  currentuser: any;
  userkey: any;
  users: any;
  chatData= {
   name: '',
   date: 0,
   text: ''
  };
  constructor(public router: Router, public chatService: ChatService) {
     //chatService.chats.child(this.currentuser.uid+'-my').push({name:'yyc'});
     this.room = 'all';
     this.items = chatService.getData('all');
     this.currentuser = JSON.parse(localStorage.getItem('user'));
     console.log(this.currentuser.uid+'-my');
     chatService.users.push(this.currentuser).then((res) => {
            this.userkey = res.key;
     });
      window.onbeforeunload = (e) => {
        chatService.users.child(this.userkey).remove();
      };
     this.users = chatService.getUser();
     this.chatData.name = this.currentuser.displayName;
  }


  refresh(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.value;
    console.log(id);
    this.room = (this.currentuser.uid < id ? (this.currentuser.uid+'-'+id) : (id + '-' +this.currentuser.uid));
    // this.chatService.chats.child(this.room).push({name:'test'});
    this.items = this.chatService.getData((id==='all') ?'all' : (this.room));
  }


  ngOnDestroy() {
     console.log(123);
     this.chatService.users.child(this.userkey).remove();
  }

  send(){
     this.chatData.date = new Date().getTime();
     this.chatService.chats.child(this.room).push(this.chatData);
  }


}

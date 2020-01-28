import { firestoreResponse } from './../models/firestore-response';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { UserService } from './../service/user.service';
import { NotesService } from './../service/notes.service';
import { Notes } from './../models/notes-interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notes-share',
  templateUrl: './notes-share.component.html',
  styleUrls: ['./notes-share.component.scss'],
})
export class NotesShareComponent implements OnInit {
  @Input() id: string;
  note: firestoreResponse<Notes>;
  noteShared: Notes;
  email: string;
  shared_users: string[] = [];

  constructor(
    private navParams: NavParams,
    public modalController: ModalController,
    private userService: UserService,
    private notesService: NotesService
  ) {
    this.noteShared = {
      title: '',
      category: '',
      content: '',
      shared_users: [],
      user: ''
    }
  }

  ngOnInit() {
    this.loadNote();
  }

  loadNote() {
    this.notesService.getNote(this.navParams.get('id')).subscribe(resp => {
      this.note = {
        id: resp.payload.id,
        data: resp.payload.data()
      }
    });
  }

  share() {
    this.shared_users.push(this.email);
    this.notesService.shareNote(this.navParams.get('id'), this.shared_users).then(resp => {
      this.userService.getUsuario(this.email).subscribe(resp => {
        this.noteShared.category = this.note.data.category;
        this.noteShared.content = this.note.data.content;
        this.noteShared.title = this.note.data.title;
        this.noteShared.user = resp[0].payload.doc.id;
        this.noteShared.shared_users = this.note.data.shared_users;
        this.noteShared.shared_users.push(localStorage.getItem('email'));
        let num=this.noteShared.shared_users.indexOf(this.email);
        this.noteShared.shared_users.splice(num, 1);
        this.notesService.createNote(this.noteShared).then(resp => {
          this.modalController.dismiss({
            dismissed: true
          });
        });
      })

    });
  }

}

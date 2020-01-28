import { Notes } from './../models/notes-interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


export const notesCollection="notes";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private db:AngularFirestore) { }

  getNotes(id){
    return this.db.collection<Notes>(notesCollection,x=>x.where("user","==",id)).snapshotChanges();
  }

  createNote(note:Notes){
    return this.db.collection<Notes>(notesCollection).add(note);
  }
  getNote(id){
    return this.db.collection<Notes>(notesCollection).doc<Notes>(id).snapshotChanges();
  }
  shareNote(id,shared_users){
    return this.db.collection<Notes>(notesCollection).doc<Notes>(id).update({
      shared_users:shared_users
    });
  }
}

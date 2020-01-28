import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user-interface';

export const usersCollection="users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  createUser(user :User){
    return this.db.collection<User>(usersCollection).add(user);
  }
  getUsuarios(){
    return this.db.collection<User>(usersCollection).valueChanges();
  }

  getUsuario(email:string){
    return this.db.collection<User>(usersCollection,x=>x.where('email','==',email)).snapshotChanges();
  }
}

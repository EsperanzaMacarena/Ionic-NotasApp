import { Categories } from './../models/categories-interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

const categoriesCollection="categories";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private db:AngularFirestore) { }

  getCategories(id){
    return this.db.collection<Categories>(categoriesCollection,x=>x.where("user","==",id)).snapshotChanges();
  }

  getCategory(id){
    return this.db.collection<Categories>(categoriesCollection).doc<Categories>(id).snapshotChanges();
  }
  createCategory(category:Categories){
    return this.db.collection<Categories>(categoriesCollection).add(category);
  }

  editCategory(id,title){
    return this.db.collection<Categories>(categoriesCollection).doc(id).update({
      title: title
    })
  }

  deleteCategory(id){
    return this.db.collection<Categories>(categoriesCollection).doc(id).delete();
  }
}

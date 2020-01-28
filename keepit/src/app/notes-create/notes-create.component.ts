import { firestoreResponse } from './../models/firestore-response';
import { CategoriesService } from './../service/categories.service';
import { NotesService } from "./../service/notes.service";
import { Notes } from "./../models/notes-interface";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Categories } from '../models/categories-interface';
import { UserService } from '../service/user.service';

@Component({
  selector: "app-notes-create",
  templateUrl: "./notes-create.component.html",
  styleUrls: ["./notes-create.component.scss"]
})
export class NotesCreateComponents implements OnInit{
  id:string='';
  nota: Notes;
  categories:firestoreResponse<Categories>[]=[];
  constructor(
    public modalController: ModalController,
    private noteService: NotesService,
    private categoryService:CategoriesService,
    private userService: UserService
  ) {
    this.nota = {
      title: "",
      category: "",
      content: "",
      user:'',
      shared_users:[]
    };
  }
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(){
    this.userService.getUsuario(localStorage.getItem("email")).subscribe(resp => {
      this.id = resp[0].payload.doc.id;
      this.categoryService.getCategories(this.id).subscribe(resp=>{
        this.categories=[];
        resp.forEach(x=>{
          this.categories.push({
            id:x.payload.doc.id,
            data:x.payload.doc.data()
          })
        })
      });
    });
  }

  save() {
    this.nota.user=this.id;
    this.noteService.createNote(this.nota).then(resp => {
      this.modalController.dismiss({
        dismissed: true
      });
    });
  }
}

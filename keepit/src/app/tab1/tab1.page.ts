import { NotesShareComponent } from './../notes-share/notes-share.component';
import { CategoriesService } from "./../service/categories.service";
import { ModalController } from "@ionic/angular";
import { Notes } from "./../models/notes-interface";
import { firestoreResponse } from "./../models/firestore-response";
import { NotesService } from "./../service/notes.service";
import { Component, OnInit } from "@angular/core";
import { NotesCreateComponents } from "../notes-create/notes-create.component";
import { Categories } from "../models/categories-interface";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  notes: firestoreResponse<Notes>[];
  categories: firestoreResponse<Categories>[];
  isEmpty: boolean = false;
  message = "No hay notas que mostrar";
  bool = false;
  id: string = "";
  constructor(
    private notesService: NotesService,
    public modalController: ModalController,
    private categoriesService: CategoriesService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.userService.getUsuario(localStorage.getItem("email")).subscribe(resp => {
      this.id = resp[0].payload.doc.id;
      this.notesService.getNotes(this.id).subscribe(resp => {
        this.notes = [];
        this.isEmpty = false;
        this.bool = false;
        resp.forEach(x => {
          this.notes.push({
            id: x.payload.doc.id,
            data: x.payload.doc.data()
          });
        });
        this.notes.forEach(x => {
          this.categoriesService
            .getCategory(x.data.category)
            .subscribe(resp => {
              x.data.category = resp.payload.data().title;
              x.data.shared_users.forEach(y => {
                this.userService.getUsuario(y).subscribe(resp => {
                  y = resp[0].payload.doc.data().email;
                })
              })

            });
        });
        this.bool = true;
        if (this.notes.length == 0) this.isEmpty = true;
      });
    });
  }

  async open() {
    var modal = await this.modalController.create({
      component: NotesCreateComponents
    });
    return await modal.present();
  }

  async share(id) {
    var modal = await this.modalController.create({
      component: NotesShareComponent,
      componentProps: {
        id: id
      }
    });
    return await modal.present();
  }
}


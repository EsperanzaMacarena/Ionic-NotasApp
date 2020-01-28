import { UserService } from "./../service/user.service";
import { CategoriesNewComponent } from "./../categories-new/categories-new.component";
import { ModalController } from "@ionic/angular";
import { Categories } from "./../models/categories-interface";
import { firestoreResponse } from "./../models/firestore-response";
import { CategoriesService } from "./../service/categories.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  message = "No hay categorías que mostrar";
  categories: firestoreResponse<Categories>[] = [];
  isEmpty: boolean = false;
  id: string = "";
  constructor(
    private categoriesService: CategoriesService,
    public modalController: ModalController,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.userService
      .getUsuario(localStorage.getItem("email")).subscribe(resp => {
        this.id = resp[0].payload.doc.id;

        this.categoriesService.getCategories(this.id).subscribe(resp => {
          this.categories = [];
          this.isEmpty = false;
          resp.forEach(x => {
            this.categories.push({
              id: x.payload.doc.id,
              data: x.payload.doc.data()
            });
          });
          if (this.categories.length == 0) this.isEmpty = true;
        });
      });
  }

  deleteCategory(id) {
    this.categoriesService.deleteCategory(id).then(resp => {
      console.log(resp);
    });
  }

  async open(editable, id) {
    var modal = await this.modalController.create({
      component: CategoriesNewComponent,
      componentProps: {
        edit: editable,
        id: id
      }
    });
    return await modal.present();
  }
}

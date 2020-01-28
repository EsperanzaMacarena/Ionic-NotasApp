import { UserService } from './../service/user.service';
import { Categories } from "./../models/categories-interface";
import { ModalController, NavParams } from "@ionic/angular";
import { CategoriesService } from "./../service/categories.service";
import { Component, Input, OnInit  } from "@angular/core";

@Component({
  selector: "app-categories-new",
  templateUrl: "./categories-new.component.html",
  styleUrls: ["./categories-new.component.scss"]
})
export class CategoriesNewComponent implements OnInit{
 
  @Input() edit: boolean;
  @Input() id: string;
  category: Categories;
  constructor(
    private navParams:NavParams,
    public modalController: ModalController,
    private userService:UserService,
    private categoriesService: CategoriesService
  ) { this.category={
    title:'',
    user:''
  }}
  ngOnInit(){
    this.preload();
  }

  preload(){
    if(this.navParams.get('edit')){
      this.categoriesService.getCategory(this.navParams.get('id')).subscribe(resp=>{
        this.category.title=resp.payload.data().title;
        this.category.user=resp.payload.data().user;
      })
    }else{
      this.userService.getUsuario(localStorage.getItem("email")).subscribe(resp=>{
        this.category.title='';
        this.category.user=resp[0].payload.doc.id;
      });
      
    }
  }

  save() {
    console.log(this.category);
    if(this.navParams.get('edit')){
      this.categoriesService.editCategory(this.navParams.get('id'),this.category.title).then(resp => {
        this.modalController.dismiss({
          dismissed: true
        });
      });
    }else{
      this.categoriesService.createCategory(this.category).then(resp => {
        this.modalController.dismiss({
          dismissed: true
        });
      });
    }
   
  }
}

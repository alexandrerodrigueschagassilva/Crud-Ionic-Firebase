import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactProvider } from '../../providers/contact/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage({
  name: 'paginaContato'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  title: string;
  formContact: FormGroup;
  contact: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private cProvider: ContactProvider,
    private toast: ToastController
    
    ) {
      this.contact = this.navParams.data.contact || {};
      this.createForm();
      this.setUpPageTitle();
  }

  private setUpPageTitle(){
    this.title = this.navParams.data.contact ? 'Alterando contato' : 'Novo contato';
  }

  createForm(){
    this.formContact = this.formBuilder.group({
      key: [this.contact.key],
      name: [this.contact.name, Validators.required],
      tel: [this.contact.tel, Validators.required]
    });
  }

  onSubmit(){
    if(this.formContact){
      this.cProvider.save(this.formContact.value)
        .then(()=>{
          this.toast.create({ message: 'contato salvo com sucesso', duration: 3000 }).present().then(()=>{
            this.navCtrl.popToRoot();
          })
          //this.navCtrl.pop();
        })
        .catch((e)=>{
          this.toast.create({ message: 'Ocorreu um erro', duration: 3000 }).present();
          console.log(e);
        });
    }
  }
}

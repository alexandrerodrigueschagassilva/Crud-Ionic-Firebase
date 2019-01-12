import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ContactProvider } from '../../providers/contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts:any;

  constructor(
    public navCtrl: NavController,
    private provider: ContactProvider,
    private toast: ToastController
    ) {
    //Recupera todos os registros
    this.contacts = this.provider.getAll();    
  }

  newContact(){
    this.navCtrl.push('paginaContato');
  }
  removecontact(key: string){
    this.provider.remove(key);
  }
  editContact(contact: any){
    this.navCtrl.push('paginaContato', {contact:contact});
  }
}

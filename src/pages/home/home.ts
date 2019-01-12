import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ContactProvider } from '../../providers/contact/contact';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts:any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private provider: ContactProvider,
    private toast: ToastController
    ) {
    this.contacts = this.provider.getAll();    
  }

  newContact(){
    this.navCtrl.push('paginaContato');
  }
}

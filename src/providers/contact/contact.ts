import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactProvider {

  private PATH = 'contacts/';
  private itemRef = this.db.list(this.PATH);

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db:AngularFireDatabase ) { 
    this.itemsRef = this.db.list('contacts/', ref => ref.orderByChild('name'));// ordena pelo nome
  }

  getAll(){
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.items;  
  }

  
  get(key: string){
    this.itemRef = this.db.list('contacts/' + key); 
    
    this.items = this.itemRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return this.items;
  }
  
  save(contact: any){

    let parameters = {
      name: contact.name,
      tel: contact.tel
    }

    return new Promise((resolve, reject)=>{
      
      if(contact.key){
        //update
        this.db.list(this.PATH)
          .update(contact.key, parameters)
          .then(()=> resolve())
          .catch((e) => reject(e));
        
      }else{
        //push
        this.db.list(this.PATH)
          .push(parameters)
          .then(()=> resolve());
      }
    });
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key)
  }

}

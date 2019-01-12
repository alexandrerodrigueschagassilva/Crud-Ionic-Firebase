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

  constructor(private db:AngularFireDatabase ) { }

  getAll(){
    this.itemsRef = this.db.list('contacts/');    
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.items;  
  }

  /*
  get(key: string){
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() }
      });
  }
  */
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

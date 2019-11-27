import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../shared/authentication.service';
@Component({
  selector: 'app-root',
  template: `
  <ul>
    <li *ngFor="let item of items | async">
      <p>{{item.key}}</p>
      <input type="text" #updatetext [value]="item.name" />
      <button (click)="updateItem(item.key, updatetext.value)">Update</button>
      <button (click)="deleteItem(item.key)">Delete</button>
    </li>
  </ul>
  <input type="text" #newitem />
  <button (click)="addItem(newitem.value)">Add</button>
  <button (click)="deleteEverything()">Delete All</button>
  `,
})
export class TestComponent {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase,public authenticationService: AuthenticationService) {
    //this.itemsRef = db.list('users', ref => ref.orderByChild('email').equalTo('thevoidreaver13@gmail.com'));
    
    this.authenticationService.userData.subscribe(user =>{
      if (user){
        this.itemsRef = db.list('users', ref => ref.orderByChild('email').equalTo(user.email));
        this.items = this.itemsRef.snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      }
    }
    )
    
  }
  addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { name: newText });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
}
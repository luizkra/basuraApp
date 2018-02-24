import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Service } from '../../service/services';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [Service]
})
export class ListPage {
  selectedItem: any;
  trashes: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Service, public events: Events) {
    this.loadTrashes();
  }

  //load data from Json
  loadTrashes() {
    this.service.getTrashes().subscribe((data) => {
      this.trashes = data;
    },
      (error) => {
        console.log(error.code);
      }
    );
  }

  sendTrash(dataTrash){
    this.events.publish('addToBottle', dataTrash);
  }

  filterItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.trashes = this.trashes.filter(function(item) {
        return item.name.toLowerCase().includes(val.toLowerCase());
      });
    }
  }
}

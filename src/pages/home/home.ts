import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  	bottle: any = [];
  	total: any= 0;
  	FechaInicio: any;
  	promedio: any= 0;
  	totalkg: any =0;
  	productoPlus: any= 'Vacío';

  constructor(public navCtrl: NavController, public events: Events) {
  	this.check();
    events.subscribe('addToBottle', (dataTrash) => {
      this.addTrash(dataTrash);
    });

  }

  addTrash(data){

    var objIndex = this.bottle.findIndex((obj => obj.id == data.id));
    if (objIndex != -1)
    	this.bottle[objIndex].total +=1; 
    else
  		this.bottle.push({id: data.id, name: data.name, kg: data.kg, total: 1});
  	
  	this.total = this.bottle.length;
  	setTimeout(() => {
  		this.calcPromedio();
  		this.getProductoPlus();
    }, 500);

  }

  calcPromedio(){
  	let sum = 0;
  	this.bottle.forEach(trash => {
  		sum = sum+(trash.total * Number(trash.kg));
  	});
  	this.totalkg = Number(sum);
  	this.promedio = Number(sum/this.total).toFixed(2);
    localStorage.setItem('promedio', this.promedio);
    localStorage.setItem('totalkg', this.totalkg);
    localStorage.setItem('bottle', JSON.stringify(this.bottle));
  }

  getProductoPlus(){
  	const maxValueOfY = Math.max.apply(Math,this.bottle.map(function(o){return o.total;}));
  	const objIndex = this.bottle.findIndex((obj => obj.total == maxValueOfY));
    if (objIndex != -1){
    	this.productoPlus = this.bottle[objIndex].name;
    	localStorage.setItem('productoPlus', this.promedio);
    }
  }

  openList(){
  	this.navCtrl.push(ListPage);
  }
  check(){
    (localStorage.getItem('FechaInicio'))?( this.FechaInicio=localStorage.getItem('FechaInicio')):( this.FechaInicio='');
    (localStorage.getItem('promedio'))?( this.promedio=localStorage.getItem('promedio')):( this.promedio=0);
    (localStorage.getItem('totalkg'))?( this.totalkg=localStorage.getItem('totalkg')):( this.totalkg=0);
    (localStorage.getItem('productoPlus'))?( this.productoPlus=localStorage.getItem('productoPlus')):( this.productoPlus='Vacío');
    (JSON.parse(localStorage.getItem('bottle')))?( this.bottle=JSON.parse(localStorage.getItem('bottle'))):( '');
  }

}

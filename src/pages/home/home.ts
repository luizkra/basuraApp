import { Component } from '@angular/core';
import { NavController, Events, ToastController } from 'ionic-angular';
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
  	totalDias: any =0;
  	productoPlus: any= 'Vacío';

  constructor(public navCtrl: NavController, public events: Events, public toastCtrl: ToastController) {
  	this.check();
    events.subscribe('addToBottle', (dataTrash) => {
      this.addTrash(dataTrash);
    });

  }
  ionViewDidLoad(){
  	this.totalDias =this.getDays();
  	console.log(this.totalDias);
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

    this.presentToast('Se agrego correctamente');

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
  
  //get days after of login
  getDays() {
     var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
     var oneHour = 60*60*1000;

     console.log(this.FechaInicio);
     var firstDate = new Date(this.FechaInicio);
     var myDate = new Date(firstDate.getTime() + firstDate.getTimezoneOffset()*60000);
     var secondDate = new Date();
     console.log(myDate);
     console.log(secondDate);
     var diffDays = Math.round(Math.abs((myDate.getTime() - secondDate.getTime())/(oneDay)));
     console.log(diffDays);
     if (diffDays === 0) {
        var hour = Math.round(Math.abs((myDate.getTime() - secondDate.getTime())/(oneHour)));
        console.log(hour);
        if (hour > 1) {
          diffDays = 1
        }
     }
     return diffDays;
   }
   presentToast(msj) {
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}

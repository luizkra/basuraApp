import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Service {
	options: any;
	https: any;
	data: any;

	constructor(private http: Http) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.options = new RequestOptions({ headers: headers });
		this.https = http;
	}
	getTrashes() {
		return this.http.get('assets/data/trash.json').map(res => res.json());
	}
}
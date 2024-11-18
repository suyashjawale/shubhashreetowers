import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class FetchdataService {
	constructor(private http: HttpClient) { }

	fetchData() {
		return this.http.get('https://dashing-llama-639318.netlify.app/.netlify/functions/building-maintenance');
	}
}

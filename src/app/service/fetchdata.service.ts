import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthData } from '../interface/month-data';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})

export class FetchdataService {
	constructor(private http: HttpClient) { }

	fetchData(): Observable<MonthData[]> {
		return this.http.get<MonthData[]>('https://dashing-llama-639318.netlify.app/.netlify/functions/building-maintenance');
	}
}

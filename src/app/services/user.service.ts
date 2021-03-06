import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  insertUser(data): Observable<any>{
     return this.http.post('https://jsonplaceholder.typicode.com/users',data);    
  }

  getAllUsers(): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

}

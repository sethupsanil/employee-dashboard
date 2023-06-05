import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoList, User } from '../models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}
  public getAllEmployee(): Observable<User[]> {
    return this._http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
  public viewEmployeeTaskById(id: number): Observable<TodoList[]> {
    return this._http.get<TodoList[]>(
      `https://jsonplaceholder.typicode.com/users/${id}/todos`
    );
  }
}

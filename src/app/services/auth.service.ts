import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  baseURL = "https://localhost:44301/api/";
  
  registerUser(user: Array<string>){
    return this.http.post(this.baseURL + 'User/CreateUser', 
    {
      FirstName: user[0],
      LastName: user[1],
      Email: user[2],
      Mobile: user[3],
      Gender: user[4],
      PWD: user[5]
    }, 
    {
      responseType: 'text',
    });
  }

  loginUser(loginInfo: Array<String>){
    return this.http.post(
      this.baseURL + 'User/LoginUser',
      {
        Email: loginInfo[0],
        Pwd: loginInfo[1],
      },
      {
        responseType: 'text',
      }
    )
  }
}

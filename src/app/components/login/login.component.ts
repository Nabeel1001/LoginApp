import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginAuth: AuthService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
  });
  displaymessg: string = '';
  isUserValid: boolean = false;

  loginSubmited(){
    this.loginAuth.loginUser([
      this.loginForm.value.email!, this.loginForm.value.pwd!])
      .subscribe(res => {

        if(res == 'Fail'){
          this.displaymessg = 'Login Unsuccessfull';
          this.isUserValid = false;
        }else{
          this.displaymessg = 'Login Successfull!!';
          this.isUserValid = true;
        }
       
        
      });

    console.log(this.loginForm)
  }



  get Email():FormControl{
    return this.loginForm.get('email') as FormControl;
  }
  get PWD():FormControl{
    return this.loginForm.get('pwd') as FormControl;
  }
}

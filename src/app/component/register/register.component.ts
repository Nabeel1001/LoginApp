import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noop } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  repeatPass: string = 'none';

  displayMsg: string = '';
  isAccountCreated: boolean = false;

  constructor(private authService: AuthService) { }

  
  ngOnInit(): void {}

  registerForm = new FormGroup({
    firstname : new FormControl('', [
      Validators.required,
      Validators.minLength(3), 
      Validators.pattern("[a-zA-Z].*") ]),
    lastname : new FormControl("", [
      Validators.required,
      Validators.minLength(3), 
      Validators.pattern("[a-zA-Z].*") ]),
    email : new FormControl("", [
      Validators.required,
      Validators.email,
      ]),
    mobile : new FormControl("",[
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    gender : new FormControl("", Validators.required),
    pass : new FormControl("", [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(8), ]),
    con_pass : new FormControl(""),
});

  registerSubmited(){
    if(this.PWD.value == this.RPWD.value){
      console.log(this.registerForm.valid);
      this.repeatPass = 'none';

      this.authService
      .registerUser([
        this.registerForm.value.firstname!,
        this.registerForm.value.lastname!,
        this.registerForm.value.email!,
        this.registerForm.value.mobile!,
        this.registerForm.value.gender!,
        this.registerForm.value.pass!,

      ])
      .subscribe((res) => {
        if(res == 'Success'){
          this.displayMsg = 'Account Created Successfully!';
          this.isAccountCreated = true;
        }else if(res == 'Already Exist'){
          this.displayMsg = 'Account already exist. Try another Email.';
          this.isAccountCreated = false;
        }else{
          this.displayMsg = 'Somthing went worng';
          this.isAccountCreated = false;
        }
      });
      
    }else{
      this.repeatPass = 'inline'
    }

    console.log(this.registerForm);
  }


  get FirstName(): FormControl{
    return this.registerForm.get("firstname") as FormControl;
  }

  get LastName(): FormControl{
    return this.registerForm.get("lastname") as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get MobileNumber(): FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }
  get Gender(): FormControl{
    return this.registerForm.get("gender") as FormControl;
  }
  get PWD(): FormControl{
    return this.registerForm.get("pass") as FormControl;
  }
  get RPWD(): FormControl{
    return this.registerForm.get("con_pass") as FormControl;
  }
}

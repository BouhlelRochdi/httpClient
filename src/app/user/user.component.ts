import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm : FormGroup;
  submited = false;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup ({
      idUser : new FormControl ('',Validators.required),
      name : new FormControl ('',Validators.required),
      nameUser : new FormControl('',Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      adress : new FormGroup ({
        street : new FormControl('', Validators.required),
        suit : new FormControl('',Validators.required),
        city : new FormControl('', Validators.required),
        zipcode : new FormControl('', Validators.required),
        geo : new FormGroup({
          lat : new FormControl('', Validators.required),
          long : new FormControl('', Validators.required)
        })
      }),
      phone : new FormControl('', Validators.required),
      webSite : new FormControl('', Validators.required),
      company : new FormGroup({
        nameComp : new FormControl('', Validators.required),
        catchPhrase : new FormControl('', Validators.required),
        bs : new FormControl('', Validators.required)
      })
    })
  }
  get adressForm(): FormGroup {
    return this.userForm.get('adress') as FormGroup;
  }
  get geoForm(): FormGroup {
    // return this.adressForm().controls.geo as FormGroup;
    return this.adressForm.get('geo') as FormGroup;
  }

  get companyForm(): FormGroup {
    return this.userForm.get('company') as FormGroup;
  }

  validate(){
    this.submited = true;    
    if(this.userForm.invalid)
    {
      return;
    }
    this.userService.insertUser(this.userForm.value).subscribe(response=>{
      console.log(response);
      this.userForm.reset();
      this.submited= false;
      
    }, err => {
      console.log(err);
    });
  }

  

}

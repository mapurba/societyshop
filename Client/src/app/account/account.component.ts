import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { PasswordValidation } from '../shared/services/factories/image-factory';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountProfileForms = {
    name: '',
    email: '',
    location: '',
    gender: '',
    website: ''
  };

  accountProfileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    location: new FormControl(''),
    gender: new FormControl(''),
    website: new FormControl(''),
  });
  accountPassword = new FormGroup({
    newPassword:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required])
  },{validators:PasswordValidation.MatchPassword});

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUserDetail.subscribe((res: any) => {
      if (res != null) {
        this.accountProfileForm.patchValue({ 'email': res.email, 'name': res.profile.name, 'location': res.profile.location, 'gender': res.profile.gender, 'website': res.profile.website });
      }
    })
  }

  ngOnInit() {

  }

  submitProfile() {
    this.http.post('/api/account/profile', this.accountProfileForm.value).subscribe((res) => {
      alert('success');
    }, (err) => {
      alert('err');
    }
    );
  }

  updatePassword(){

  }



}

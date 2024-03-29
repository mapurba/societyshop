import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/shared/services/factories/image-factory';
import { UserService } from 'src/app/shared/services/user.service';

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
    website: '',
    vpa: '',
  };

  accountProfileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    vpa: new FormControl(''),
    location: new FormControl(''),
    gender: new FormControl(''),
    website: new FormControl(''),
  });
  accountPassword = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: PasswordValidation.MatchPassword });

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUserDetail.subscribe((res: any) => {
      if (res != null) {
        this.accountProfileForm.patchValue({ 'email': res.email, 'name': res.profile.name, 'location': res.profile.location, 'gender': res.profile.gender, 'website': res.profile.website, 'vpa': res.payment.upi.vpa });
      }
    })
  }

  ngOnInit() {

  }

  submitProfile() {
    this.http.post('/api/user/account/profile', this.accountProfileForm.value).subscribe((res) => {
      // alert('success');
    }, (err) => {
      // alert('err');
    }
    );
  }

  updatePassword() {

  }



}

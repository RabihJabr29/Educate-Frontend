import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private authStatusSubs: Subscription;
  constructor(private authService: AuthService) { }
  formInvalid: boolean = false;

  ngOnInit(): void {
    // this.authStatusSubs = this.authService
    //   .getAuthStatusListener()
    //   .subscribe((authStatus) => {
    //     if (!authStatus) {
    //       this.isLoading = false;
    //     }
    //   });
  }

  ngOnDestroy() {
    // this.authStatusSubs.unsubscribe();
  }

  onSignUp(form: NgForm) {
    this.formInvalid = form.invalid;
    if (form.invalid) {
      return;
    }

    console.log("welcome new " + form.value.email);
    // this.isLoading = true;
    // this.authService.createUser(form.value.email, form.value.password);
  }
}

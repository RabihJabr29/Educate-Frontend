import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSubs: Subscription;
  formInvalid: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.authInvalid.subscribe(flag => this.formInvalid = flag);
  }

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

  onLogin(form: NgForm) {
    (function () {
      'use strict';
      window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

    this.formInvalid = form.invalid;
    if (form.value.password.invalid || form.value.email.invalid) this.formInvalid = true;
    if (this.formInvalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);

  }
}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../../shared/interfaces/interfaces';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  message$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message$.next('Пожалуйста, введите данные')
      } else if (params['authFalid']) {
        this.message$.next('Пожалуйста, введите данные')
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted$.next(true)

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted$.next(false)
    }, () => {
      this.submitted$.next(false)
    })
  }
}


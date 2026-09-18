import { Component, DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  TuiButton,
  TuiLabel,
  TuiError,
  TuiTitle,
  TuiInput,
  TuiIcon,
  TUI_VALIDATION_ERRORS,
} from "@taiga-ui/core";
import { TuiForm, TuiHeader, TuiCardLarge } from "@taiga-ui/layout";
import { TuiPassword, TuiToastService } from "@taiga-ui/kit";
import { AuthService } from "@core/auth";
import { passwordValidator } from "@shared/validators";
import { Login as LoginModel } from '../../models/login';
import { catchError } from "rxjs";

type LoginForm = {[K in keyof LoginModel]: FormControl<LoginModel[K]>};

@Component({
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiLabel,
    TuiTitle,
    TuiError,
    TuiInput,
    TuiPassword,
    TuiForm,
    TuiHeader,
    TuiCardLarge,
    TuiIcon,
  ],
  selector: "app-login",
  styleUrl: "./login.scss",
  templateUrl: "./login.html",
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useFactory: () => ({
        required: 'Поле обязательно для заполнения',
        minlength: ({ requiredLength }: { requiredLength: string }) =>
          signal(`Минимальная длина ${requiredLength}`),
      }),
    },
  ],
})
export class Login {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _toastService = inject(TuiToastService);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _returnUrl =
    this._route.snapshot.queryParams["returnUrl"] || "/";

  readonly loginForm = new FormGroup<LoginForm>({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [
      Validators.required,
      Validators.minLength(8),
      passwordValidator,
    ]}),
  });
  protected serverError = signal<string | null>(null);

  onSubmit() {
    const { username, password } = this.loginForm.getRawValue();

    if (!username || !password) {
      return;
    }

    this._authService.login(username, password)
      .pipe(
        catchError((err) => {
          this.serverError.set(err.message);
          return this._toastService.open(err.message);
        }),
        takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._router.navigateByUrl(this._returnUrl));
  }
}

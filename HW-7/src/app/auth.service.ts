// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Observable текущего пользователя (null, если не залогинен).
   */
  readonly currentUser$: Observable<User | null>;

  constructor(private readonly auth: Auth) {
    this.currentUser$ = authState(this.auth);
  }

  /**
   * Регистрация пользователя по email и паролю.
   * Возвращает Observable с User | null.
   */
  signup(email: string, password: string): Observable<User | null> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map((cred) => cred.user),
      catchError((error) => this.handleError(error, 'signup'))
    );
  }

  /**
   * Логин по email и паролю.
   * Возвращает Observable с User | null.
   */
  login(email: string, password: string): Observable<User | null> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((cred) => cred.user),
      catchError((error) => this.handleError(error, 'login'))
    );
  }

  /**
   * Выход из аккаунта.
   * Возвращает Observable<void>.
   */
  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError((error) => this.handleError(error, 'logout'))
    );
  }

  /**
   * Приватный обработчик ошибок.
   * Здесь мы мапим firebase error.code -> человекочитаемый текст.
   * Компоненты просто показывают message из Error.
   */
  private handleError(error: any, context: 'signup' | 'login' | 'logout') {
    console.error(`[AuthService:${context}]`, error);

    let message = 'Something went wrong. Please try again.';

    // Firebase auth error codes:
    // https://firebase.google.com/docs/reference/js/auth#autherrorcodes
    switch (error?.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already in use.';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address.';
        break;
      case 'auth/weak-password':
        message = 'Password is too weak. Please choose a stronger one.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = 'Incorrect email or password.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many attempts. Please try again later.';
        break;
      default:
        if (typeof error?.message === 'string') {
          message = error.message;
        }
        break;
    }

    return throwError(() => new Error(message));
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(public auth: AuthService){}
// para que no puedan acceder mediante la url
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
      return this.auth.isAuthenticated$.pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.auth.login(state.url);
          }
        })
      );
  }
  
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot & { _routerState: { url: string } }, state: RouterStateSnapshot): boolean {
    const redirectUrl = route._routerState.url;

    if (!this.auth.isLoggedIn) {
      this.router.navigateByUrl(
        this.router.createUrlTree(
          [ '/signin' ], {
            queryParams: {
              redirectUrl
            }
          }
        )
      );

      return false;
    } else {
      return true;
    }
  }
}

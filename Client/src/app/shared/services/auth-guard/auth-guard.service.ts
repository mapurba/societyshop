import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router, private userDetail: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log("user static");

    console.log(this.userDetail.getCurrentUserStatic());
    if (this.userDetail.getCurrentUserStatic() == undefined) return false;
    else if (this.userDetail.getCurrentUserStatic().isMer) {
      return true;
    } else return true;
  }
}

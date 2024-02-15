import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import { AuthService } from "src/services/auth.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
   
     constructor(private authservice:AuthService , private router:Router){ 

     }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let token = this.authservice.getToken();  
   
    if (token) { 
     if(!request.headers.get("skip")){ 
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+ token 
        } 
      }); 
     } 
    }
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) { 
    
      if (err.status !== 403) {
       return;
      }   
      this.authservice.logout();
      window.location.reload();  
    }
  }));;
  }
}

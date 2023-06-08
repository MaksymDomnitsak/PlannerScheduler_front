import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveUser } from 'src/app/models/saveUser';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  userProfile: BehaviorSubject<SaveUser> = new BehaviorSubject<SaveUser>({
    email: '',
    userName: '',
    userId: 0,
    groupId: '',
    role: ''
  });

  login(email: any,password: any) {
    console.log(email+" "+password);
    return this.http.post<SaveUser>('/api/auth/login', {email,password},{withCredentials:true});
  }

  saveUserToLocalStorage(user: SaveUser) {
    this.userProfile.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(this.userProfile)
  }

  loadUserFromLocalStorage(): SaveUser {
    if (this.userProfile.value.userId == 0) {
      let fromLocalStorage = localStorage.getItem('user');
      if (fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }
  refreshCookie() {
    return this.http.post('api/auth/refreshToken', {
      withCredentials: true,
    });
  }

  loadRole(): string{
    if (this.userProfile.value.userId == 0) {
      let fromLocalStorage = localStorage.getItem('user');
      if (fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    
    return this.userProfile.value.role;
  }

  logout() {
    return this.http.post('api/auth/sign-out', { withCredentials: true });
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveUser } from 'src/app/models/saveUser';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  timeoutId!: number;
  userInfo?: SaveUser;
  role!: string;

  constructor(private service: AuthService,private router: Router){
  }

  ngOnInit(): void {
    this.timeoutId = 5;
    this.service.userProfile.subscribe((data) => {
      this.setUser(data);
    });
  }


  openSidebar() {
    clearTimeout(this.timeoutId);
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.timeoutId = setTimeout(() => {
      this.isSidebarOpen = false;
    }, 300);
  }

  logOut() {
    this.service.logout().subscribe({
      next: () => {
        this.service.userProfile.next({
          email: '',
          userName: '',
          userId: 0,
          groupId: '',
          role: ''
        });
        localStorage.removeItem('user');
        this.router.navigateByUrl('/dashboard',{ skipLocationChange: true }).then(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
    });
}
  setUser(data:any){
    this.userInfo = data;
  }
}


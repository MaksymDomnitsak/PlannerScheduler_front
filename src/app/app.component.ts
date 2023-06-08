import { Component,OnInit,AfterViewChecked } from '@angular/core';
import { SaveUser } from './models/saveUser';
import { AuthService } from './modules/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userInfo?: SaveUser;
  title = 'PlannerScheduler';
  currentRoute!: string;

  constructor(private auth: AuthService,private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit(): void {
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });
  }

  ngDoCheck(){
    this.currentRoute = this.router.url;
  }
}

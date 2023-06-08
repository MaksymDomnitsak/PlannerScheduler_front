import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Page404Component } from './pages/page-404/page404.component';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/services/auth.service';
import { AuthInterceptor } from './modules/auth/auth.interceptor';
import { NoteModule } from './modules/note/note.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './modules/admin/admin.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { AllScheduleComponent } from './components/all-schedule/all-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    FooterComponent,
    Page404Component,
    AllScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    NoteModule,
    AdminModule,
    ScheduleModule,
    TeacherModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModalModule
  ],
  providers: [AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }

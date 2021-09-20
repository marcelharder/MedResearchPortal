import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule, CarouselModule, TabsModule, PaginationModule} from 'ngx-bootstrap';
import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule} from 'ngx-gallery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AboutComponent } from './about/about.component';
import { ProcedureListComponent } from './procedure_list/procedure_list.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { AlertifyService } from './_services/alertify.service';

import { CoachService } from './_services/coach.service';
import { MemberListComponent } from './members/memberList/member-list.component';
import { MemberCardComponent } from './members/memberCard/member-card.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';


import { UserProfileComponent } from './users/userProfile/userProfile.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCardComponent } from './users/userCard/userCard.component';
import { EditUserDetailsComponent } from './users/edit_user_details/edit_user_details.component';
import { UserDetailsResolver } from './_resolvers/user-details.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { ProfileResolver } from './_resolvers/profile.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './users/PhotoEditor/PhotoEditor.component';
import { DetailsOneComponent } from './test/details-one/details-one.component';
import { DetailsTwoComponent } from './test/details-two/details-two.component';
import { DetailsThreeComponent } from './test/details-three/details-three.component';





export function tokenGetter() {return localStorage.getItem('token');}

@NgModule({
   declarations: [
      AppComponent,
      AboutComponent,
      ProcedureListComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
    
      MemberListComponent,
      MemberCardComponent,
      MemberDetailsComponent,
      UserProfileComponent,
     
      UserListComponent,
      UserCardComponent,
      EditUserDetailsComponent,
      UserProfileComponent,
      PhotoEditorComponent,
      DetailsOneComponent,
      DetailsTwoComponent,
      DetailsThreeComponent
      
     
   ],
   imports: [
      HttpClientModule,
      PaginationModule.forRoot(),
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      TabsModule.forRoot(),
      BsDropdownModule.forRoot(),
      CarouselModule.forRoot(),
      NgxGalleryModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      CoachService,
      AuthGuard,
      UserDetailsResolver,
      UserListResolver,
      ProfileResolver,
      PreventUnsavedChanges

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

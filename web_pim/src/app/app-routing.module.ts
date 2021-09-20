import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { MemberDetailsComponent } from './members/member-details/member-details.component';

import { AuthGuard } from './_guards/auth.guard';
import { UserListComponent } from './users/user-list/user-list.component';
import { EditUserDetailsComponent } from './users/edit_user_details/edit_user_details.component';
import { UserDetailsResolver } from './_resolvers/user-details.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserProfileComponent } from './users/userProfile/userProfile.component';
import { ProfileResolver } from './_resolvers/profile.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { AboutComponent } from './about/about.component';
import { DetailsOneComponent } from './test/details-one/details-one.component';
import { DetailsThreeComponent } from './test/details-three/details-three.component';
import { DetailsTwoComponent } from './test/details-two/details-two.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent, children: [
    { path: 'one', component: DetailsOneComponent, outlet: "rot" },{ path: 'two', component: DetailsTwoComponent, outlet: "rot"},{ path: 'three', component: DetailsThreeComponent, outlet: "rot"}] },
  { path: 'coach/:id', component: MemberDetailsComponent },

  {
path: '',
runGuardsAndResolvers: 'always',
canActivate: [AuthGuard],
children: [
  { path: 'main/one', component: DetailsOneComponent},

  // { path: 'user/:id', component: EditUserDetailsComponent, resolve: {user: UserDetailsResolver} },
  { path: 'profile', component: UserProfileComponent, resolve: {user: ProfileResolver}, canDeactivate: [PreventUnsavedChanges]},
  // { path: 'users', component: UserListComponent, resolve: {users: UserListResolver} },

]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

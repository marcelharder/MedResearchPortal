import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserProfileComponent } from '../users/userProfile/userProfile.component';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<UserProfileComponent>{
canDeactivate(component: UserProfileComponent){
    if (component.editForm.dirty){ return confirm('Áre you sure you want to continue? Any unsaved changes will be lost ...'); }
    return true;
}
}

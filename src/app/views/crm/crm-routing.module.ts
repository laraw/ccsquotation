import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactEditComponent } from './contact-edit.component';
import { FamiliesComponent } from './families.component';
import { FamilyComponent } from './family.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'CRM'
    },
    children: [
        {
            path: '',
            redirectTo: 'families'
          },
          {
            path: 'families',
            component: FamiliesComponent,
            data: {
              title: 'Families'
            }
          },
          {
            path: 'families-detail/:id',
            component: FamilyComponent,
            data: {
              title: 'detail'
            }
          },
          {
            path: 'enquiries',
            component: FamiliesComponent,
            data: {
              title: 'Enquiries'
            }
          },         
          {
            path: 'leads',
            component: FamiliesComponent,
            data: {
              title: 'Leads'
            }
          },         
          {
            path: 'tours',
            component: FamiliesComponent,
            data: {
              title: 'Tours'
            }
          },       
          {
            path: 'contact-edit/:id',
            component: ContactEditComponent,
            data: {
              title: 'Contact Edit'
            }
          }           
      
          
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule  {}

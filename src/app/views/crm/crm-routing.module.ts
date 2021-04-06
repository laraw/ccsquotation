import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliesComponent } from './families.component';

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
      
          
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule  {}

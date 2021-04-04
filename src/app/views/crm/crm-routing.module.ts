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
      
          
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule  {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
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
            path: 'detail/:id',
            component: CentreDetailComponent,
            data: {
              title: 'detail'
            }
          },
          {
            path: 'room-list',
            component: RoomListComponent,
            data: {
              title: 'roomlist'
            }
          },
          
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule  {}

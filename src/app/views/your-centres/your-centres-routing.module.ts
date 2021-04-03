import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentreSearchComponent } from './centre-search.component';
import { CentreQuoteComponent } from './centre-quote.component';
import { CentreDetailComponent } from './centre-detail.component';
import { RoomListComponent } from './room-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Your Centres'
    },
    children: [
        {
            path: '',
            redirectTo: 'centre-search'
          },
          {
            path: 'centre-search',
            component: CentreSearchComponent,
            data: {
              title: 'centre-search'
            }
          },
          {
            path: 'centre-quote',
            component: CentreQuoteComponent,
            data: {
              title: 'centre-quote'
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
export class YourCentresRoutingModule {}

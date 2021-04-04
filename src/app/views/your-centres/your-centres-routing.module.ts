import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindACentreComponent } from './find-a-centre.component';
import { CentreQuoteComponent } from './centre-quote.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Your Centres'
    },
    children: [
        {
            path: '',
            redirectTo: 'find-a-centre'
          },
          {
            path: 'find-a-centre',
            component: FindACentreComponent,
            data: {
              title: 'Find a Centre'
            }
          },
          {
            path: 'centre-quote',
            component: CentreQuoteComponent,
            data: {
              title: 'centre-quote'
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

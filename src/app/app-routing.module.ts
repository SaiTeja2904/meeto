import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiverComponent } from './receiver/receiver.component';
import { SenderComponent } from './sender/sender.component';

const routes: Routes = [
  { path: 'send', component: SenderComponent },
  { path: 'receive', component: ReceiverComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

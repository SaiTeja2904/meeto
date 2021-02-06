import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodePlatformComponent } from './code-platform/code-platform.component';
import { ConnectionComponent } from './connection/connection.component';
import { EditorComponent } from './editor/editor.component';
import { GuestComponent } from './guest/guest.component';
import { HostComponent } from './host/host.component';

const routes: Routes = [
  { path: 'connection', component: ConnectionComponent },
  { path: 'host', component: HostComponent },
  { path: 'guest/:id', component: GuestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

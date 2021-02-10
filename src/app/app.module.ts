import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticlesModule } from 'angular-particle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnectionComponent } from './connection/connection.component';
import { EditorComponent } from './editor/editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodePlatformComponent } from './code-platform/code-platform.component';
import { HostComponent } from './host/host.component';
import { GuestComponent } from './guest/guest.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    EditorComponent,
    CodePlatformComponent,
    HostComponent,
    GuestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParticlesModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

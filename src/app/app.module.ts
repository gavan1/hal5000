import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatSidenavModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatMenuModule, MatTabsModule, MatExpansionModule, MatButtonToggleModule, MatButtonModule} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LeapVisualizerComponent } from './leap-visualizer/leap-visualizer.component';
//import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    LeapVisualizerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    //navigation
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    //UI
    MatButtonToggleModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    //TEXT
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

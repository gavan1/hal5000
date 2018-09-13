import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatSidenavModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatMenuModule, MatTabsModule, MatExpansionModule, MatButtonToggleModule, MatButtonModule} from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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

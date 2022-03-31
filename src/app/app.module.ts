// Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// Component
import { AppComponent } from './app.component';
import { HorseRacingComponent } from './components/horse-racing/horse-racing.component';
import { HeaderComponent } from './layout/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RacesTableComponent } from './components/races-table/races-table.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';

// Services
import { HipodromoService } from './services/hipodromo.service';
import { RaceTableService } from './services/race-table.service';

// Angular material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './layout/footer/footer.component';
import { CustomValueComponent } from './components/custom-value/custom-value.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CountdownComponent } from './components/countdown/countdown.component';
import { ShareModule } from 'ngx-sharebuttons';
@NgModule({
  declarations: [
    AppComponent,
    HorseRacingComponent,
    // DemoHorseRacingComponent,
    HeaderComponent,
    ToolbarComponent,
    RacesTableComponent,
    TicketDetailComponent,
    FooterComponent,
    CustomValueComponent,
    CountdownComponent,
  ],
  imports: [
    ShareModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    // Material components
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    SlickCarouselModule,
  ],
  providers: [
    HipodromoService,
    RaceTableService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

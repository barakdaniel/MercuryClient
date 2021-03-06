import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlatformComponent } from './platform/platform.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { ResearchesListComponent } from './platform/researches-list/researches-list.component';
import { ResearchCreateComponent } from './platform/research-create/research-create.component';
import { ResearchDetailsComponent } from './platform/research/research-details/research-details.component';
import { ResearchComponent } from './platform/research/research.component';
import { ResearchParticipantsDataComponent } from './platform/research/research-participants-data/research-participants-data.component';
import { ResearchNetworkComponent } from './platform/research/research-network/research-network.component';
import { ResearchMetadataComponent } from './platform/research/research-metadata/research-metadata.component';
import { NetworkComponent } from './platform/research/research-network/network/network.component';
import { ResearchCsvComponent } from './platform/research/research-csv/research-csv.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PlatformComponent,
    LoginComponent,
    RegisterComponent,
    ResearchesListComponent,
    ResearchCreateComponent,
    ResearchDetailsComponent,
    ResearchComponent,
    ResearchNetworkComponent,
    ResearchMetadataComponent,
    ResearchParticipantsDataComponent,
    NetworkComponent,
    ResearchCsvComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    HttpClientModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

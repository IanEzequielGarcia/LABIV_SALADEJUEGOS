import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './juegos/preguntados/preguntados.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChatComponent } from './components/chat/chat.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EncuestaRespuestasComponent } from './components/encuesta-respuestas/encuesta-respuestas.component';
import { ListadoPuntajesComponent } from './components/listado-puntajes/listado-puntajes.component';
@NgModule({
  declarations: [
    AppComponent,
    QuienSoyComponent,
    HomeComponent,
    NavComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    AhorcadoComponent,
    RegistroComponent,
    NotFoundComponent,
    ChatComponent,
    EncuestaComponent,
    EncuestaRespuestasComponent,
    ListadoPuntajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

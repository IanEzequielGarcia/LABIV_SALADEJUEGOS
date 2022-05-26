import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegoPropioComponent } from './juego-propio/juego-propio.component';

@NgModule({
  declarations: [
  
    JuegoPropioComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
  ]
})
export class JuegosModule { }

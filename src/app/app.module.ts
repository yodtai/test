import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpBookDirective } from './http-book.directive';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MessageModule} from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PipePokemonModule } from 'src/shared/pipe/pipe-pokemon/pipe-pokemon.module';

@NgModule({
  declarations: [
    AppComponent,
    HttpBookDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    MessageModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    PipePokemonModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

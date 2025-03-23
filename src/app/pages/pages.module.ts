import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    LayoutModule,
    RouterModule,
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }

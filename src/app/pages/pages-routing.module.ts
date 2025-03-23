import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';
import { GraphDataResolver } from '../resolvers/graph.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'graph/:id',
    component: GraphComponent,
    resolve: {
      graphData: GraphDataResolver
    },
    providers: [GraphDataResolver]
  },
  {
    path: 'graph',
    component: GraphComponent,
    resolve: {
      graphData: GraphDataResolver
    },
    providers: [GraphDataResolver]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

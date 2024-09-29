import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComentariosComponent } from './componentes/list-comentarios/list-comentarios.component';
import { AgregarEditarComentarioComponent } from './componentes/agregar-editar-comentario/agregar-editar-comentario.component';
import { VerComentarioComponent } from './componentes/ver-comentario/ver-comentario.component';

const routes: Routes = [
  { path: '',component: ListComentariosComponent},
  { path: 'agregar',component: AgregarEditarComentarioComponent},
  { path: 'editar/:id',component: AgregarEditarComentarioComponent},
  { path: 'ver/:id',component: VerComentarioComponent},
  { path: '**',redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

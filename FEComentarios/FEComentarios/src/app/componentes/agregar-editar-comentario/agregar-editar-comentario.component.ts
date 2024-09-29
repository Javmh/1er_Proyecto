import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comentario } from '../../interfaces/Comentario';
import { ComentarioService } from '../../services/comentario.service';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
//import { Router } from 'express';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrl: './agregar-editar-comentario.component.css'
})
export class AgregarEditarComentarioComponent {
agregarComentario: FormGroup;
accion = 'agregar';
id = 0;
comentario: comentario | undefined;

constructor(private fb: FormBuilder,
  private _comentarioService: ComentarioService,
private router: Router,
private aRoute: ActivatedRoute){
  this.agregarComentario = this.fb.group({
    titulo: ['',Validators.required],
    creador: ['',Validators.required],
    texto: ['',Validators.required]
      })
  this.id = +this.aRoute.snapshot.paramMap.get('id')!;
}
ngOnInit(): void{
  this.esEditar();
}
esEditar(){
if (this.id !== 0) {
  this.accion = 'Editar';
  this._comentarioService.getComentario(this.id).subscribe({
    next: (data: comentario) => {
           this.comentario = data;
           this.agregarComentario.patchValue({
            titulo: data.titulo,
            texto: data.texto,
            creador: data.creador,
           })
  }, 
  error: (error: any) =>{
    alert("Ha ocurrido un error");
  }
  });
}

}

agregarEditarComentario(){
if (this.comentario == undefined){

  //Agregamos un nuevo comentario
  const comentario: comentario = {
    titulo: this.agregarComentario.get('titulo')?.value,
    creador: this.agregarComentario.get('creador')?.value,
    texto: this.agregarComentario.get('texto')?.value,
    fechaCreacion: new Date
    }
  console.log(comentario);
   this._comentarioService.saveComentario(comentario).subscribe({
    next: (data: comentario) => {
      alert("Información almacenada correctamente");
      this.router.navigate(['/']);
  }, 
  error: (error: any) =>{
    alert("Ha ocurrido un error");
  }
  });
}
//Editamos comentario
else
{
  const comentario: comentario = {
    id: this.comentario.id,
    titulo: this.agregarComentario.get('titulo')?.value,
    creador: this.agregarComentario.get('creador')?.value,
    texto: this.agregarComentario.get('texto')?.value,
    fechaCreacion: this.comentario.fechaCreacion
    }
    this._comentarioService.updateComentario(this.id, comentario). subscribe({
      next: (data: comentario) => {
        alert("Información almacenada correctamente");
        this.router.navigate(['/']);
    }, 
    error: (error: any) =>{
      alert("Ha ocurrido un error");
    }
    });
}
  
    }
}
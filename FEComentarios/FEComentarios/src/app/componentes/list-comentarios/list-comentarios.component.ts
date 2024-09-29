import { Component } from '@angular/core';
import { comentario } from '../../interfaces/Comentario';
import { ComentarioService } from '../../services/comentario.service';
import { error } from 'console';

@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrl: './list-comentarios.component.css'
})
export class ListComentariosComponent {
listcomentario: comentario[] = [
];

constructor(private _comentarioService: ComentarioService){
}
ngOnInit(): void{
this.getComentarios();
}


getComentarios(){
  this._comentarioService.getListComentarios().subscribe({next: data => {
                this.listcomentario = data;
}, error: err => {
          console.log(err.error.msg);
        }
      });
      }

eliminarComentario(id: any){
  console.log(id);
  this._comentarioService.deleteComentario(id).subscribe((res:any) => {
    this.getComentarios();
    alert(res.message);
});
}


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { comentario } from '../../interfaces/Comentario';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-ver-comentario',
  templateUrl: './ver-comentario.component.html',
  styleUrl: './ver-comentario.component.css'
})
export class VerComentarioComponent implements OnInit {
id:number;
comentario: comentario | undefined;

constructor(private aRoute: ActivatedRoute, 
    private _comentarioService: ComentarioService) {
  this.aRoute.snapshot.paramMap.get('id');
 this.id = +this.aRoute.snapshot.paramMap.get('id')!;
}
ngOnInit():void {
 this.getcomentario();
}

//VER DESCRIPCION DE COMENTARIO
getcomentario(){
 this._comentarioService.getComentario(this.id).subscribe(data => {
    this.comentario = data;
  });
}



}

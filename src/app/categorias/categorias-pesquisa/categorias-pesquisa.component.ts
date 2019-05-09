import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-categorias-pesquisa',
  templateUrl: './categorias-pesquisa.component.html',
  styleUrls: ['./categorias-pesquisa.component.css']
})
export class CategoriasPesquisaComponent implements OnInit {

  categorias = [];

  nomeBusca : string;

  constructor(private service:CategoriasService,
     private msg: MessageService,
    private confirmation: ConfirmationService) { }

  pesquisar(){
    this.service.pesquisar({nome:this.nomeBusca})
    .then((dados)=>{
      this.categorias=dados;
    });
  }
  confirmarExclusao(categoria:any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir '+categoria.nome+'?',
      accept: () => {
        this.excluir(categoria);
      }
    });
  }

  ngOnInit() {
    this.pesquisar();
  }

  excluir(categoria: any){
    this.service.excluir(categoria.id)
    .then(()=>{
      this.pesquisar();
      this.msg.add({severity:'success', summary:'Excluido', detail:"Excluido com sucesso!"});
    }
    )};

}

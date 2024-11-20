import { Route } from "@angular/router";
import { ListagemUsuariosComponent } from "./listagem-usuarios/listagem-usuarios.component";
import { CadastroUsuariosComponent } from "./cadastro-usuarios/cadastro-usuarios.component";
import { EdicaoUsuariosComponent } from "./edicao-usuarios/edicao-usuarios.component";

export const USUARIOS_ROUTES: Route[] = [
  
  {path: '', component: ListagemUsuariosComponent},
  {path: 'cadastro', component: CadastroUsuariosComponent},
  {path: ':id', component: EdicaoUsuariosComponent},
];
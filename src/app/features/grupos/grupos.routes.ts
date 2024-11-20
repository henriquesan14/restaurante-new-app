import { Route } from "@angular/router";
import { ListagemGruposComponent } from "./listagem-grupos/listagem-grupos.component";
import { CadastroGruposComponent } from "./cadastro-grupos/cadastro-grupos.component";
import { EdicaoGruposComponent } from "./edicao-grupos/edicao-grupos.component";

export const GRUPOS_ROUTES: Route[] = [
  {path: '', component: ListagemGruposComponent},
  {path: 'cadastro', component: CadastroGruposComponent},
  {path: ':id', component: EdicaoGruposComponent}
];
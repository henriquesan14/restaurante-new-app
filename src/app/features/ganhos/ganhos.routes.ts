import { Route } from "@angular/router";
import { ListagemGanhosComponent } from "./listagem-ganhos/listagem-ganhos.component";
import { CadastroGanhosComponent } from "./cadastro-ganhos/cadastro-ganhos.component";
import { EdicaoGanhosComponent } from "./edicao-ganhos/edicao-ganhos.component";

export const GANHOS_ROUTES: Route[] = [
  {path: '', component: ListagemGanhosComponent},
  {path: 'cadastro', component: CadastroGanhosComponent},
  {path: ':id', component: EdicaoGanhosComponent},
];
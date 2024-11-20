import { Route } from "@angular/router";
import { ListagemDespesasComponent } from "./listagem-despesas/listagem-despesas.component";
import { CadastroDespesasComponent } from "./cadastro-despesas/cadastro-despesas.component";
import { EdicaoDespesasComponent } from "./edicao-despesas/edicao-despesas.component";

export const DESPESAS_ROUTES: Route[] = [
  {path: '', component: ListagemDespesasComponent},
  {path: 'cadastro', component: CadastroDespesasComponent},
  {path: ':id', component: EdicaoDespesasComponent},
];
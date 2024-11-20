import { Route } from "@angular/router";
import { ListagemMenusComponent } from "./listagem-menus/listagem-menus.component";
import { ItensMenuComponent } from "./itens-menu/itens-menu.component";

export const MENUS_ROUTES: Route[] = [
  {path: '', component: ListagemMenusComponent},
  {path: ':id', component: ItensMenuComponent}
];
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Mesa } from '../../core/models/mesa.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  private API: string = environment.apiUrlBase;
  constructor(private http: HttpClient) { }

  getMesas(parametros: any): Observable<Mesa[]>{
    let params = new HttpParams();
    for (const key in parametros) {
      if (parametros.hasOwnProperty(key) && parametros[key] !== null && parametros[key] !== undefined) {
        params = params.append(key, parametros[key]);
      }
    }
    return this.http.get<Mesa[]>(`${this.API}/table`, {params});
  }

  addMesa(mesa: Mesa): Observable<Mesa>{
    return this.http.post<Mesa>(`${this.API}/table`, mesa);
  }

  getMesaById(id: number){
    return this.http.get<Mesa>(`${this.API}/table/${id}`);
  }

  updateMesa(mesa: Mesa){
    return this.http.put(`${this.API}/table`, mesa);
  }

  updateStatusMesa(updateStatusMesa: any){
    return this.http.patch(`${this.API}/table`, updateStatusMesa);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {
  private operador: Operadores[] =
    []
  constructor() { }
}
export interface Operadores {
  nombre: string,
  email: string

}
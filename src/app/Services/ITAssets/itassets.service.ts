import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItassetsService {

  private sharedData: any;

  constructor() { }

  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }

  clearData() {
    this.sharedData = null;
  }}

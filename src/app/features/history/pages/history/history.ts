import { Component } from '@angular/core';
import { PurchaceTable } from '../../components/purchace-table/purchace-table';

@Component({
  imports: [PurchaceTable],
  selector: 'app-history',
  styleUrl: './history.scss',
  templateUrl: './history.html',
})
export class History {}

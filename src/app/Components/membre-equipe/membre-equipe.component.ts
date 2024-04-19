import { Component, OnInit } from '@angular/core';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-membre-equipe',
  standalone: true,
  imports: [],
  templateUrl: './membre-equipe.component.html',
  styleUrl: './membre-equipe.component.scss'
})
export class MembreEquipeComponent implements OnInit{
  constructor(private dialog: MatDialog) { }
 
  ngOnInit(): void {

  }

  


}
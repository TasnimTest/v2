import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartTypeRegistry, registerables } from 'chart.js';
import { EmployeeSkill } from '../../Model/employee-skill.module';
import { EmployeeSkillService } from '../../Service/employee-skill.service';
import { Domaine, Niveau } from '../competence/competence-enum';
import { UserService } from '../../Service/user.service';
import { AuthService } from '../../Service/auth.service';
import { User } from '../../Model/user.model';
import { ChartOptions } from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  skills: EmployeeSkill[] = [];
  userId!: number;

  constructor(
    private skillService: EmployeeSkillService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
   
  }

  // Fetch the user ID + fetch user skills related to this iD
}
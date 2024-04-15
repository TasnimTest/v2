import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { EmployeeSkill } from '../../Model/employee-skill.module';
import {CommonModule} from "@angular/common";
import { EmployeeSkillService } from '../../Service/employee-skill.service';
import { AuthService } from '../../Service/auth.service';
import { UserService } from '../../Service/user.service';
import { User } from '../../Model/user.model';
import { FormsModule } from '@angular/forms';
import { Domaine,Niveau } from './competence-enum'; 
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddSkillComponent } from '../add-skill/add-skill.component';


@Component({
  selector: 'app-competence',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']

})
export class CompetenceComponent implements OnInit {


  userId!: number;
  skills: EmployeeSkill[] = []; 


  constructor(private employeeSkillService: EmployeeSkillService,private authservice: AuthService,private userService:UserService,private dialog: MatDialog) { }
 
  ngOnInit(): void {

    const userDetails = this.authservice.getUserDetails();

    if (userDetails && userDetails.username) {
      // Call the method to get user details by username
      this.userService.getUserByUsername(userDetails.username).subscribe(
        (user: User | null) => {
          if (user) {
            // Extract userId from user object
            this.userId = user.matricule;
            // Now you have the userId, you can fetch the skills
            this.getAllUserSkills();
           
          } else {
            console.error('User not found or error occurred while fetching user details.');
          }
        },
        (error) => {
          console.error('An error occurred while fetching user details:', error);
        }
      );
    } else {
      console.error('Logged-in username not found.');
    }
  }

  //Get USER_SKILLS Based on the USerID
  getAllUserSkills() {
    this.employeeSkillService.getAllUserSkills(this.userId).subscribe(
      (data: any[]) => {
        // Assuming the data structure is as you described
        this.skills = data.map(item => item.skill);
        console.log(this.skills); // Verify the structure of skills
      },
      (error) => {
        console.error('An error occurred while fetching user skills:', error);
      }
    );
  }

  
  /*ADD USER_SKILL
  addUserSkill(skillId: number) {
    this.employeeSkillService.addUserSkill(this.userId, skillId).subscribe(
      (skill: EmployeeSkill) => {
        console.log('Compétence utilisateur ajoutée avec succès:', skill);
        this.getAllUserSkills(); // Mettre à jour la liste des compétences après l'ajout
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de la compétence utilisateur:', error);
      }
    );
  }*/

  // Ajoute une nouvelle compétence à la liste
  ajouterCompetence( skillId: number ) {
           const addSkill : EmployeeSkill= {
              id:0,
              nom_compétence: '',
              domaine: Domaine.Technologie_et_Informatique,
              niveau: Niveau.Débutant
            };
                                 
            this.skills.push(addSkill);
            this.employeeSkillService.addUserSkill(this.userId, skillId, addSkill).subscribe(
              (skill: EmployeeSkill) => {
                console.log('Com/pétence utilisateur ajoutée avec succès:', skill);
                this.getAllUserSkills(); 
              },
              (error: any) => {
                console.error('Une erreur s\'est produite lors de l\'ajout de la compétence utilisateur:', error);
              }
            );
  }
  
  generateUniqueId(): number {
    // Logique pour générer un ID unique, par exemple en utilisant un horodatage
    return Date.now();
  }
  
  getAllSkill(){
    this.employeeSkillService.getAllSkill().subscribe(
      (data: any[]) => {
        // Assuming the data structure is as you described
        this.skills = data.map(item => item.skill);
        console.log(this.skills); // Verify the structure of skills
      },
      (error) => {
        console.error('An error occurred while fetching user skills:', error);
      }
    );
  }

  // Delete USER_SKILL
  deleteUserSkill(skillId: number) {
    this.employeeSkillService.deleteUserSkill(this.userId, skillId).subscribe(
      (response: string) => {
        console.log(response);
        this.getAllUserSkills(); // Mettre à jour la liste des compétences après la suppression
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la suppression de la compétence utilisateur:', error);
      }
    );
    window.location.reload();
  }

  // Mettre à jour une compétence utilisateur
  updateUserSkill( userId: number,skillId: number, updatedSkill: EmployeeSkill): void {
    this.employeeSkillService.updateUserSkill(userId,skillId,updatedSkill)
      .subscribe(
        (skill: EmployeeSkill) => {
          console.log('Employee skill updated successfully:', skill);
          // Perform any additional actions after successful update
        },
        (error: any) => {
          console.error('An error occurred while updating employee skill:', error);
          // Handle error
        }
      );
  }
  

  domaines: string[] = Object.values(Domaine);
  niveaux: string[] = Object.values(Niveau);

  /*
  addUserSkill(skillId: number) {
    this.employeeSkillService.addUserSkill(this.userId, skillId).subscribe(
      (skill: EmployeeSkill) => {
        console.log('Compétence utilisateur ajoutée avec succès:', skill);
        this.getAllUserSkills(); // Mettre à jour la liste des compétences après l'ajout
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de la compétence utilisateur:', error);
      }
    );
  }*/


  openAddSkillPopup(): void {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '400px',
      data: { userId: this.userId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getAllSkill(); // Refresh skills after adding a skill
      }
    });
  }

  
}




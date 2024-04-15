
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Domaine, Niveau } from '../competence/competence-enum';
import { EmployeeSkill } from '../../Model/employee-skill.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent   implements OnInit{
  skillForm: FormGroup;
  domaines: string[] = Object.values(Domaine);
  niveaux: string[] = Object.values(Niveau);

  constructor(
    private dialogRef: MatDialogRef<AddSkillComponent>,
    private formBuilder: FormBuilder
  ) {
    this.skillForm = this.formBuilder.group({
      nom_compétence: ['', Validators.required],
      domaine: [Domaine.Technologie_et_Informatique, Validators.required],
      niveau: [Niveau.Débutant, Validators.required]
    });
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit(): void {
    if (this.skillForm.invalid) {
      return;
    }

    const newSkill: EmployeeSkill = {
      id: 0,
      nom_compétence: '',
      domaine: this.skillForm.value.domaine,
      niveau: this.skillForm.value.niveau
    };

    // Pass the new skill back to the parent component
    this.dialogRef.close(newSkill);
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without passing any data
  }
}

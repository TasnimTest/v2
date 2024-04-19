import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit{
  equipeForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private formBuilder: FormBuilder
  ) {
    this.equipeForm = this.formBuilder.group({
      username: ['', Validators.required],
      department: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
    if (this.equipeForm.invalid) {
      return;
    }

    const newEquipe = {
      id: 0,
      username: this.equipeForm.value.username,
      department: this.equipeForm.value.department,
      note: this.equipeForm.value.note
    };

    this.dialogRef.close(newEquipe);
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}

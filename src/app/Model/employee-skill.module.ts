import { Domaine, Niveau } from "../Components/competence/competence-enum";

export class EmployeeSkill {

  id:number;
 
  nom_compétence:string; 
  domaine: Domaine; 
  niveau: Niveau; 

  constructor(id :number, nom_compétence: string, domaine:Domaine, niveau: Niveau) {
    
    this.id=id;
    
    this.nom_compétence = nom_compétence;
    this.domaine = domaine;
    this.niveau = niveau;
  }
}
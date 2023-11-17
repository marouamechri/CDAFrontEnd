import { Consultation } from "./consultation.model";
import { Doctor } from "./doctor.model";
import { SubSubject } from "./subSubjects.medel";

export interface MedicalSpecialties{
    id:Int16Array,
    speciality: string,
    icone:string,
    doctors: Array<Doctor>,
    consultations: Array<Consultation>,
    subSubjects: Array<SubSubject>
}
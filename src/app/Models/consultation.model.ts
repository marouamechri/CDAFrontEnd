import { Task } from "ngx-ui-loader";
import { DocumentApi } from "./documentApi.model";
import { NatureAction } from "./natureAction.model";
import { SubSubject } from "./subSubjects.medel";
import { Doctor } from "./doctor.model";
import { MedicalSpecialties } from "./medicalSpecialties.model";

export interface Consultation{
    id: number,
    date : Date,
    validate: boolean,
    subSubject: SubSubject,
    natureAction: NatureAction,
    prescription: Array<DocumentApi>,
    tasks: Array<Task>,
    doctor: Doctor,
    medicalSpecialties:MedicalSpecialties
}
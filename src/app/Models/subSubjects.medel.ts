import { EventApi } from "./EventApi.model";
import { MedicalSpecialties } from "./medicalSpecialties.model";
import { Subject } from "./subject.model";

export interface SubSubject{
    id: number,
    title:string,
    subject: Subject,
    medicalSpecialties: MedicalSpecialties,
    events : Array<EventApi>,
}
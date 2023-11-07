import { Binder } from "./binder.model";
import { MedicalSpecialties } from "./medicalSpecialties.model";

export interface Doctor{
    id:string,
    name: string,
    address: string,
    phone: string,
    medicalSpecialties: Array<MedicalSpecialties>,
    spaces: Array<Binder>
}
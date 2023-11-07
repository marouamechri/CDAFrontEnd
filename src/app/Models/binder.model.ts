import { Doctor } from "./doctor.model";
import { Subject } from "./subject.model";
import { User } from "./user.model";

export interface Binder{
    id: number,
    name:string,
    user:User, 
    subjects: Array<Subject>,
    doctors : Array<Doctor>
}
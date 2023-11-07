import { Binder } from "./binder.model";
import { SubSubject } from "./subSubjects.medel";

export interface Subject{
    id: number,
    binder: Binder,
    title: string,
    subSubjects: Array<SubSubject>

}
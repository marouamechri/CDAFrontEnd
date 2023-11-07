import { DocumentApi } from "./documentApi.model";
import { NatureAction } from "./natureAction.model";
import { SubSubject } from "./subSubjects.medel";
import { Task } from "./task.model";

export interface Analysis{
    id: number,
    date : Date,
    validate: boolean,
    subSubject: SubSubject,
    natureAction: NatureAction,
    prescription: Array<DocumentApi>,
    tasks: Array<Task> 
    results: Array<DocumentApi>
}
import { Task } from "ngx-ui-loader";
import { DocumentApi } from "./documentApi.model";
import { NatureAction } from "./natureAction.model";
import { SubSubject } from "./subSubjects.medel";

export interface Treatment{
    id: number,
    date : Date,
    validate: boolean,
    subSubject: SubSubject,
    natureAction: NatureAction,
    prescription: Array<DocumentApi>,
    tasks: Array<Task>,
    dateFin : Date

}
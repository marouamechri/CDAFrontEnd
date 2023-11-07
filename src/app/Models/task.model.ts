import { EventApi } from "./EventApi.model";
import { DocumentApi } from "./documentApi.model";
import { NatureAction } from "./natureAction.model";

export interface Task{
    id: number,
    description: string,
    event :EventApi,
    eventValidate: EventApi,
    nextEvent: EventApi,
    typeTask: Task,
    state: number,
    natureAction: NatureAction,
    prescription: Array<DocumentApi>
}
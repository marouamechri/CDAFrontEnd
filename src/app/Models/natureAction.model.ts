import { Task } from "ngx-ui-loader";
import { EventApi } from "./EventApi.model";

export interface NatureAction{
    id: number;
    title: string,
    events: Array<EventApi>,
    tasks: Array<Task>
}
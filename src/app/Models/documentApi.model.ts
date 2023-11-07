import { Task } from "ngx-ui-loader"
import { EventApi } from "./EventApi.model"
import { Analysis } from "./analysis.model"

export interface DocumentApi{
    id: number,
    name: string
    events: Array<EventApi>,
    tasks: Array<Task>,
    resultAnalyse: Analysis,
}
import { Subject } from 'rxjs';
import {TaskStatus} from "@app/_lib/interfaces";


export const CreateContent = new Subject<TaskStatus>()
export const ListenCreateContent = new Subject<void>()
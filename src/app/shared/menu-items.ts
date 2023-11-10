import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    authority: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', authority: 'ADMIN' },
    { state: 'binder', name: 'Manage binder', type: 'link', icon: 'folder', authority: 'USER' },
    { state: 'doctor', name: 'Manage doctor', type: 'link', icon: 'medical_services', authority: 'USER' },
    { state: 'event', name: 'Manage event', type: 'link', icon: 'event', authority: 'USER' },
    //{ state: 'subject', name: 'Manager subject', type: 'link', icon: 'subject', authority: 'USER' },
    //{ state: 'subSubject', name: 'Manage subSubject', type: 'link', icon: 'subject', authority: 'USER' },
    //{ state: 'task', name: 'Manage task', type: 'link', icon: 'people', authority: 'USER' }


]

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
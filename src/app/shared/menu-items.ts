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
    { state: 'binder', name: 'Gérer mes classeur', type: 'link', icon: 'folder', authority: 'USER' },
    { state: 'doctor', name: 'Gérer mes médecin', type: 'link', icon: 'person', authority: 'USER' },
    { state: 'event', name: 'Gérer mes RDV', type: 'link', icon: 'event', authority: 'USER' },


]

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
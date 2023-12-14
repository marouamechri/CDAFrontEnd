import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    authority: string;
}

const MENUITEMS = [
    { state: 'binder', name: 'Gérer mes classeurs', type: 'link', icon: 'folder', authority: 'USER' },
    { state: 'doctor', name: 'Gérer mes médecins', type: 'link', icon: 'person', authority: 'USER' },
    { state: '', name: 'Gérer mes RDV', type: 'link', icon: 'event', authority: 'USER' },
    { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', authority: 'ADMIN' },
    { state: 'role', name: 'Gére les roles', type: 'link', icon: 'people', authority: 'ADMIN' },
    { state: 'natureAction', name: 'Gérer le nature event', type: 'link', icon: 'build', authority: 'ADMIN' },


]

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
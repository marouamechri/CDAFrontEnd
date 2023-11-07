import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', role: 'ADMIN' },
    { state: 'doctor', name: 'Manage Category', type: 'link', icon: 'category', role: 'USER' },
    { state: 'binder', name: 'Manage Product', type: 'link', icon: 'inventory_2', role: 'USER' },
    { state: 'event', name: 'Manage Order', type: 'link', icon: 'shopping_cart', role: 'USER' },
    { state: 'subject', name: 'View bill', type: 'link', icon: 'backup_table', role: 'USER' },
    { state: 'subSubject', name: 'Manage User', type: 'link', icon: 'people', role: 'USER' },
    { state: 'task', name: 'Manage User', type: 'link', icon: 'people', role: 'USER' }


]

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
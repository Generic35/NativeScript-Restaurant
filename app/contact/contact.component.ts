import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';

@Component({
    selector: 'app-contact',
    moduleId: module.id,
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent extends DrawerPage implements OnInit {
    address: any =
        {
            street: '121, Clear Water Bay Road',
            city: 'Clear Water Bay, Kowloon HONG KONG',
            tel: 'Tel: +852 1234 5678 Fax: +852 8765 4321 ',
            email: 'mail:confusion@food.net'
        }
    constructor(
        private changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    ngOnInit() {
    }

}
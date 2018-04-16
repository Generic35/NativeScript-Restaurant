import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as TNSPhone from 'nativescript-phone';
import * as Email from 'nativescript-email';

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
        private changeDetectorRef: ChangeDetectorRef, private fonticon: TNSFontIconService) {
        super(changeDetectorRef);
    }

    ngOnInit() {
    }

    sendEmail() {
        Email.available()
            .then((avail: boolean) => {
                if (avail) {
                    Email.compose({
                        to: ['confusion@food.net'],
                        subject: '[ConFusion]: Query',
                        body: 'Dear Sir/Madam:'
                    });
                }
                else
                    console.log('No Email Configured');
            })
    }

    public call() {
        console.log('calling');
        TNSPhone.dial('415-123-4567', true);
    }
}
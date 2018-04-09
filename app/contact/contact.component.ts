import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
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
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('BaseURL') private BaseURL) {
        super(changeDetectorRef);
    }

    ngOnInit() {
    }

}
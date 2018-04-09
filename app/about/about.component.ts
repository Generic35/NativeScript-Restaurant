import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { LeaderService } from '../services/leader.service';

@Component({
    selector: 'app-con',
    moduleId: module.id,
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent extends DrawerPage implements OnInit {
    leaders: any;
    leadersErrMess: string;
    history: any =
        {
            paragraph1: `Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.`,
            paragraph2: `The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`
        }
    constructor(
        private leaderService: LeaderService,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('BaseURL') private BaseURL) {
        super(changeDetectorRef);
    }

    ngOnInit() {
        this.leaderService.getLeaders()
        .subscribe(leaders => this.leaders = leaders,
          errmess => this.leadersErrMess = <any>errmess );
    }

}
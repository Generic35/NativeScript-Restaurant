import { Component, OnInit, Inject, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Page } from "ui/page";
import { Animation, AnimationDefinition } from "ui/animation";
import { View } from "ui/core/view";
import * as enums from "ui/enums";

import { DrawerPage } from '../shared/drawer/drawer.page';
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import { CouchbaseService } from '../services/couchbase.service';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html'
})
export class ReservationComponent extends DrawerPage implements OnInit {

    reservation: FormGroup;
    cardLayout: View;
    isReservationConfirmed: boolean;
    docId: string = "reservations";
    reservations: any[];

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder, private modalService: ModalDialogService, 
        private vcRef: ViewContainerRef, private page: Page, private couchbaseService: CouchbaseService) {
            super(changeDetectorRef);

            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });
    }

    ngOnInit() {
        this.reservations = []
        console.log('checking if doc exists')
        let doc = this.couchbaseService.getDocument(this.docId);
        if (doc == null) {
            console.log('document being initialized')
            this.couchbaseService.createDocument({ "reservations": [] }, this.docId);
        }
        else {
            console.log('found existing docs ', doc.reservations)
            this.reservations = doc.reservations;
        }
    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text});
    }

    onSubmit() {
        this.reservations.push(this.reservation.value);
        this.couchbaseService.updateDocument(this.docId, { "reservations": this.reservations });
        this.animateFadeOut();
    }

    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result});
                }
            });

    }

    animateFadeOut() {
        this.cardLayout = <View>this.page.getViewById<View>("cardLayout");
        let definitions = new Array<AnimationDefinition>();
        let a1: AnimationDefinition = {
            target: this.cardLayout,
            scale: { x: 0, y: 0 },
            translate: { x: 0, y: -200 },
            opacity: 0,
            duration: 500,
            curve: enums.AnimationCurve.easeIn
        };

        definitions.push(a1);
        let animationSet = new Animation(definitions);

        animationSet.play().then(() => {
          this.isReservationConfirmed = true;
          this.animateFadeIn();
        })
        .catch((e) => {
            console.log(e.message);
        });
    }

    animateFadeIn() {
        this.cardLayout = <View>this.page.getViewById<View>("cardLayout");
        let definitions = new Array<AnimationDefinition>();

        let a1: AnimationDefinition = {
            target: this.cardLayout,
            scale: { x: 1, y: 1 },
            translate: { x: 0, y: 0},
            opacity: 1,
            duration: 500,
            curve: enums.AnimationCurve.easeIn
        };

        definitions.push(a1);
        let animationSet = new Animation(definitions);

        animationSet.play().then(() => {
        })
        .catch((e) => {
            console.log(e.message);
        });
    }
}
import { Component, OnInit, Inject, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { TextField } from 'ui/text-field';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'app-comment',
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    commentForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private params: ModalDialogParams) {

            this.commentForm = this.formBuilder.group({
                author: '',
                rating: 5,
                comment: ['']
            });
    }
//
    ngOnInit(){

    }

    onAuthorChange(args) {
        let textField = <TextField>args.object;
        console.log(`inside author change, value of textfield.text is ${textField.text}`)
        this.commentForm.patchValue({ author: textField.text});
    }

    onCommentChange(args) {
        let textField = <TextField>args.object;
        console.log(`inside comment change, value of textfield.text is ${textField.text}`)
        this.commentForm.patchValue({ comment: textField.text});
    }

    onRatingChange(args) {
        let textField = <TextField>args.object;
        console.log(`inside rating change, value of textfield.text is ${textField.text}`)
        this.commentForm.patchValue({ rating: textField.text});
    }

    submit() {
        this.params.closeCallback(this.commentForm.value)
    }
}
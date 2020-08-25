import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from './login.service';
import { LoginModule } from './login.module';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginModel: LoginModule;

    /**
     * Constructor
     *
     * @param {LoginService} _loginService
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _loginService: LoginService,
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder
    ) {
        this.loginModel = new LoginModule();
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    loginComponent(): void {
        this.loginModel.username = this.loginForm.get('email').value
        this.loginModel.password = this.loginForm.get('password').value;
        this._loginService.login(this.loginModel).subscribe(
            (response) => {
                let expiredAt = new Date().getTime() + (response.expires_in * 100);
                localStorage.setItem('token', response.token_type + ' ' + response.access_token);
                this._router.navigate(['/apps/contacts']);
            },
            (error) => {
                let errorMessage = error as HttpErrorResponse;
                alert(errorMessage.error['error_description']);
            }
        );
    }
}

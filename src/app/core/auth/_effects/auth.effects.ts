// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { tap } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, Register, UserLoaded, UserRequested } from '../_actions/auth.actions';
import { AuthService } from '../_services/index';
import { AppState } from '../../reducers';


@Injectable()
export class AuthEffects {
    @Effect({dispatch: false})
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            // localStorage.setItem(environment.authTokenKey, action.payload.authToken);
            this.store.dispatch(new UserRequested());
        }),
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            // localStorage.removeItem(environment.authTokenKey);
            // localStorage.clear();
            localStorage.removeItem('exist');
			localStorage.removeItem('token');
			localStorage.removeItem('refresh-token');
			localStorage.removeItem('user');
			localStorage.removeItem('customerId');
			localStorage.removeItem('status');
			localStorage.removeItem('profile');
			localStorage.removeItem('fullName');
			localStorage.removeItem('cardNo');
			localStorage.removeItem('uid');

            this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.returnUrl}});
        })
    );

    @Effect({dispatch: false})
    register$ = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.Register),
        tap(action => {
            // localStorage.setItem(environment.authTokenKey, action.payload.authToken);
            // localStorage.setItem(environment.authTokenKey, action.payload.authToken);
        })
    );

    // @Effect({dispatch: false})
    // loadUser$ = this.actions$
    // .pipe(
    //     ofType<UserRequested>(AuthActionTypes.UserRequested),
    //     withLatestFrom(this.store.pipe(select(isUserLoaded))),
    //     filter(([action, _isUserLoaded]) => !_isUserLoaded),
    //     mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
    //     tap(_user => {
    //         if (_user) {
    //             this.store.dispatch(new UserLoaded({ user: _user }));
    //         } else {
    //             this.store.dispatch(new Logout());
    //         }
    //     })
    //   );

    @Effect()
    init$: Observable<Action> = defer(() => {
        // const userToken = localStorage.getItem(environment.authTokenKey);
        // var token;
        // this.sharedDataService.loginstatus.subscribe(data => {
		// 	// console.log('dataa::::: ', data);
		// 	token = data;
		// });
        const userToken = localStorage.getItem('token');
        // const userToken = token;
        let observableResult = of({type: 'NO_ACTION'});
        if (userToken) {
            observableResult = of(new Login({  authToken: userToken }));
        }
        return observableResult;
    });

    private returnUrl: string;

    constructor(private actions$: Actions,
                private router: Router,
                private auth: AuthService,
                // private sharedDataService: SharedDataService,
                private store: Store<AppState>) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}
}

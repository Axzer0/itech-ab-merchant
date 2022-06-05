import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }

  static auth: any = {};

    static init(): Promise<any> {
        // let keycloakAuth: any = new Keycloak('assets/keycloak.json');
        KeycloakService.auth.loggedIn = false;

        return new Promise((resolve, reject) => {
          let keycloakAuth: any = new Keycloak('./assets/keycloak.json');
            keycloakAuth.init({ onLoad: 'check-sso' })//check-sso or login-required
                .success(() => {
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = keycloakAuth;
                    // KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/agency-banking-test" +  "/protocol/openid-connect/logout?redirect_uri=http://localhost:4200/index.html";

                    resolve();
                })
                .error(() => {
                    reject();
                });
        });
    }
 
 // more methods here

}

import {DEVURL} from 'assets/dev.config';

export const environment = {
	production: true,
	serverMainApiUrl: DEVURL.serverMainApiUrl,
	serveMainAuthApiUrl: DEVURL.authServerUrl,
	clientSecret: DEVURL.clientSecret,
	resource: DEVURL.resource,
	realm: DEVURL.realm
}

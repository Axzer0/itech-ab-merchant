import { PRODURL } from 'assets/prod.config';
export const environment = {
	production: true,
	serverMainApiUrl: PRODURL.serverMainApiUrl,
	serveMainAuthApiUrl: PRODURL.authServerUrl,
	clientSecret: PRODURL.clientSecret,
	resource: PRODURL.resource,
	realm: PRODURL.realm
  }

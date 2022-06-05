import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../../../app/app.config';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private message1;
  private message2;
  private documentRequired;
  private biometricsRequired;
  status: Subject<any> = new ReplaySubject<any>(1);
  loginstatus: Subject<any> = new ReplaySubject<any>(1);

  static shareData: Subject<any> = new ReplaySubject<any>(1);
  accountForm: Subject<any> = new ReplaySubject<any>(1);
  generalForm: Subject<any> = new ReplaySubject<any>(1);
  addressForm: Subject<any> = new ReplaySubject<any>(1);
  otherInformationForm: Subject<any> = new ReplaySubject<any>(1);

  static loadingData: Subject<any> = new ReplaySubject<any>(1);
	static previewData: Subject<any> = new ReplaySubject<any>(1);
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  static  setLoginData(value){
    SharedDataService.loadingData.next(value);
  }

	public  setPreviewData(value){
		SharedDataService.previewData.next(value);
	}

	public setShareData(value) {
		SharedDataService.shareData.next(value);
		console.log("share data", value);
	}

  setGeneralForm(value){
    // console.log('setting generalForm value: ', value);
    this.generalForm.next(value);
  }
  setAccountForm(value){
    // console.log('setting accountForm value: ', value);
    this.accountForm.next(value);
  }
  setAddressForm(value){
    // console.log('setting addressForm value: ', value);
    this.addressForm.next(value);
  }

  setOtherInfoForm(value){
    // console.log('setting addressForm value: ', value);
    this.otherInformationForm.next(value);
  }


  setStatus(value){
    console.log('setting setStatus status: ', value);
    this.status.next(value);
  }
  setLoginstatus(value: string){
    this.loginstatus.next(value);
  }

  setEnrollmentFirstMessage(message1) {
    this.message1 = message1;
  }
  getEnrollmentFirstMessage() {
    return this.message1;
  }

  setEnrollmentSecondMessage(message2) {
    this.message2 = message2;
  }
  getEnrollmentSecondMessage() {
    return this.message2;
  }

  setEnrollmentThirdMessage(documentRequired) {
    this.documentRequired = documentRequired;
  }
  getEnrollmentThirdMessage() {
    return this.documentRequired;
  }
  setEnrollmentFourthMessage(biometricsRequired) {
    this.biometricsRequired = biometricsRequired;
  }
  getEnrollmentFourthMessage() {
    return this.biometricsRequired;
  }

  public isExpired(token: string) {
    if (token === null) return false;
    let exp = this.getExpiredTime(token);
    let currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
}

private getExpiredTime(token: string) {
    return this.parseJwtToken(token)['exp'];
}

parseJwtToken(token): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(payload);
}

logoutUser(refresh_token) {
  console.log('calling refresh token: ', refresh_token);
  const body = new URLSearchParams();
      body.set('refresh_token', refresh_token);
      body.set('client_id', 'agency-customer-login-test');
  this.httpClient.post(config.serveMainAuthApiUrl + config.logout_api, body.toString(), {headers: this.getHttpHeadersForLogout()}).subscribe(
    res => {
      console.log('logout successfully:: ', res);
      // localStorage.clear();
      localStorage.setItem('login', 'false');
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

      this.router.navigate(['/home']);
      indexedDB.deleteDatabase('mode');
      // window.location.reload(true);
      return;
    }, error => {
      console.log('error while calling log out api.', error);
      return;
    }
  );
}
public getHttpHeadersForLogout(): HttpHeaders {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'x-www-form-urlencoded');
  return headers;
}

}

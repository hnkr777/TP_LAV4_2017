import { log } from 'util';
import { Injectable } from '@angular/core';

import { Http, Response, Headers, HttpModule, RequestOptionsArgs, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiHttpService {

  constructor(public http: Http) {}

  public httpGetP(url: string)
  {
    return this.http
    .get(url)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  public httpPostP( url: string, objetoParametros: any, response: any, error: any) // llamada post por promise
  {
    return this.http
    .post(url, objetoParametros)
    .toPromise()
    .then(response) //.then(response=>JSON.stringify(response.json()))
    .catch(error);  //.catch(error=>JSON.stringify(error.json()));
  }

  public httpPostS(url: string, objetoParametros: any, responseCallback: any, errorCallback: any, completedCallback: ()=>void) {
    return this.http
    .post(url, objetoParametros )
    .subscribe(
      responseCallback,
      errorCallback,
      completedCallback
    );
  }

  public httpGetO ( url: string): Observable<Response>
  {
    return this.http.get( url )
      .map( ( res: Response ) => res.json())
      .catch( ( err: any ) => Observable.throw(err.json().error || 'Server error'));
  }

  public httpPostO ( url: string, params: any): Observable<Response>
  {
    return this.http.post( url, params )
      .map( ( res: Response ) => res.json())
      .catch( ( err: any ) => Observable.throw(err.json().error || 'Server error'));
  }

  private extractData ( res: Response )
  {
    alert(JSON.stringify(res));
    return res.json() || {};
  }

  private handleError ( error: Response | any )
  {
    alert(JSON.stringify(error));
    return error;
  }
}

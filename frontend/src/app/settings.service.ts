import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Setting} from "./setting";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private url = "/api/admin";
  constructor(private http: HttpClient) { }

  getSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(this.url)
  }

  getSetting(key: string): Observable<Setting> {
    return this.http.get<Setting>(this.url +'/' + key);
  }

  updateSetting(data: Setting): Observable<Setting> {
    return this.http.put<Setting>(this.url +'/' + data.key, data);
  }

  deleteSetting(key: string): Observable<Setting> {
    return this.http.delete<Setting>(this.url +'/' + key);
  }

  createSetting(data: Setting): Observable<Setting> {
    return this.http.post<Setting>(this.url, data);
  }
}

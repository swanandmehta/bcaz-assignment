import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerConstants } from '../constants/server';
import { Server } from '../dto/server';
import { WeburlDetails } from '../dto/weburl-details';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private serverList: Array<Server> = [];

  constructor(private httpClient: HttpClient) { }

  public getServerList(): Array<Server> {
    if (this.serverList.length == 0) {
      this.loadServerList();
    }

    return this.serverList;
  }

  public loadServerList(): void {
    this.httpClient.get<Server[]>(ServerConstants.SERVER_URL + "/server",).subscribe({
      next: (serverList: Server[]) => {
        this.serverList.splice(0);
        serverList.forEach(server => this.serverList.push(server));
      }
    });
  }

  public getById(id: number): Observable<Server> {
    return this.httpClient.get<Server>(ServerConstants.SERVER_URL + "/server/" + id);
  }

  public save(server: Server): Observable<Server> {
    return this.httpClient.post<Server>(ServerConstants.SERVER_URL + "/server", server);
  }

  public update(server: Server): Observable<Server> {
    return this.httpClient.patch<Server>(ServerConstants.SERVER_URL + "/server/" + server.id, server);
  }

  public delete(server: Server): Observable<void> {
    return this.httpClient.delete<void>(ServerConstants.SERVER_URL + "/server/" + server.id);
  }

  public getTitle(server: Server): Observable<WeburlDetails> {
    return this.httpClient.get<WeburlDetails>(ServerConstants.SERVER_URL + "/server/weburl/title/" + server.id);
  }

  public remove(server: Server): void {
    const index = this.serverList.findIndex(element => element.id == server.id);
    if (index != 0) {
      this.serverList.splice(index, 1);
    } else {
      this.loadServerList();
    }

  }

  public add(server: Server): void {
    this.serverList.push(server);
  }

  public modify(server: Server): void {
    let index: number = this.serverList.findIndex(element => element.id == server.id);
    if (index != -1) {
      this.serverList.splice(index, 1, server);
    } else {
      this.loadServerList();
    }
  }


}

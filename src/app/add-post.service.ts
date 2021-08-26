import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { PostPayload } from "./add-post/post-payload";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  private postUrl: string = environment.apiServerUrl;

  constructor(private httpClient: HttpClient) { }

  addPost(postPayload: PostPayload){
    return this.httpClient.post('http://localhost:8080/api/post', postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>('http://localhost:8080/api/all');
  }

  getPost(paramsLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/get' + paramsLink);
  }
}

import { Component, OnInit } from '@angular/core';
import { AddPostService } from "../add-post.service";
import { PostPayload } from "../add-post/post-payload";
import { HttpErrorResponse } from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  posts: Observable<Array<PostPayload>>;

  constructor(private addPostService: AddPostService) { }

  ngOnInit(): void {
    this.posts = this.addPostService.getAllPosts();
  }


}

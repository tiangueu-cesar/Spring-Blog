import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AddPostService } from "../add-post.service";
import {HttpErrorResponse} from "@angular/common/http";
import {PostPayload} from "../add-post/post-payload";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  paramsLink: Number;
  post: PostPayload;

  constructor(private activatedRoute: ActivatedRoute, private addPostService: AddPostService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.paramsLink = params['id'];


      this.addPostService.getPost(this.paramsLink).subscribe(
        (response: PostPayload) => {
            console.log("Successful");
            this.post = response;
        }, (error: HttpErrorResponse) => {
            console.log("Resquest failed");
        }
      );
    });
  }

}

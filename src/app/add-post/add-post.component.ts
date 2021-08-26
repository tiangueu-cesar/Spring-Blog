import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { PostPayload } from "./post-payload";
import { AddPostService } from "../add-post.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;

  constructor(private addPostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
        title: new FormControl(),
        body: new FormControl()
    });

    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: ''
    };
  }

  ngOnInit(): void {}

  public addPost() {
      this.postPayload.content = this.addPostForm.controls['body'].value;
      this.postPayload.title = this.addPostForm.controls['title'].value;

      this.addPostService.addPost(this.postPayload).subscribe(response => {
            console.log("The Post was successful");
            this.router.navigateByUrl("/welcome-page");
        }, error => {
            console.log("Failure response");
            alert(error.message);
        }
      );
  }

}

package com.example.springblog.service;

import com.example.springblog.DTO.PostDto;
import com.example.springblog.exception.PostNotFoundException;
import com.example.springblog.model.Post;
import com.example.springblog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class PostService {

    @Autowired
    AuthService authService;
    @Autowired
    PostRepository postRepository;

    public void createPost(PostDto postDto) {
        Post post = mapFromPostDtoToPost(postDto);
        postRepository.save(post);
    }

    public List<PostDto> showAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(this::mapFromPostToPostDto).collect(toList());
    }

    public Post mapFromPostDtoToPost(PostDto postDto) {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        User username = authService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("No User logged in"));
        post.setUsername(username.getUsername());
        post.setCreatedOn(Instant.now());
        return post;
    }

    public PostDto mapFromPostToPostDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setUsername(post.getUsername());
        return postDto;
    }

    public PostDto getSinglePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("For id "+ id));
        return mapFromPostToPostDto(post);
    }
}

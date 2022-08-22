package study.securitystudy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import study.securitystudy.entity.dtos.CommentRequestDto;
import study.securitystudy.entity.dtos.CommentResponseDto;
import study.securitystudy.entity.dtos.MessageDto;
import study.securitystudy.service.CommentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/list")
    public ResponseEntity<List<CommentResponseDto>> getComments(@RequestParam(name = "id") Long articleId) {
        return ResponseEntity.ok(commentService.getComments(articleId));
    }

    @PostMapping("/")
    public ResponseEntity<CommentResponseDto> postComment(@RequestBody CommentRequestDto requestDto) {
        return ResponseEntity.ok(commentService.createComment(requestDto.getArticleId(), requestDto.getBody()));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteComment(@RequestParam(name = "id") Long commentId) {
        commentService.removeComment(commentId);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
}

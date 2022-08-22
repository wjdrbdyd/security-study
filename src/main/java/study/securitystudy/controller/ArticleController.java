package study.securitystudy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import study.securitystudy.entity.dtos.*;
import study.securitystudy.service.ArticleService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/article")
public class ArticleController {
    private final ArticleService articleService;

    @GetMapping("/page")
    public ResponseEntity<Page<PageResponseDto>> pageArticle(@RequestParam(name = "page") int page) {
        return ResponseEntity.ok(articleService.pageArticle(page));
    }

    @GetMapping("/one")
    public ResponseEntity<ArticleResponseDto> getOneArticle(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(articleService.oneArticle(id));
    }

    @PostMapping("/")
    public ResponseEntity<ArticleResponseDto> createArticle(@RequestBody CreateArticleRequestDto requestDto) {
        System.out.println("requestDto = " + requestDto.toString());
        System.out.println("requestDto = " + requestDto);
        return ResponseEntity.ok(articleService.postArticle(requestDto.getTitle(), requestDto.getBody()));
    }

    @GetMapping("/change")
    public ResponseEntity<ArticleResponseDto> getChangeArticle(@RequestParam(name ="id") Long id) {
        return ResponseEntity.ok(articleService.oneArticle(id));
    }
    @PutMapping("/")
    public ResponseEntity<ArticleResponseDto> putChangeArticle(@RequestBody ChangeArticleRequestDto requestDto) {
        return ResponseEntity.ok(articleService.changeArticle(requestDto.getId(), requestDto.getTitle(), requestDto.getBody()));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteArticle(@RequestParam(name = "id") Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
}

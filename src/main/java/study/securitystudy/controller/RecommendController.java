package study.securitystudy.controller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import study.securitystudy.entity.dtos.MessageDto;
import study.securitystudy.entity.dtos.PostRecommendDto;
import study.securitystudy.entity.dtos.RecommendDto;
import study.securitystudy.service.RecommendService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class RecommendController {
    private final RecommendService recommendService;

    @GetMapping("/list")
    public ResponseEntity<RecommendDto> getRecommends(@RequestParam(name = "id") Long articleId) {
        return ResponseEntity.ok(recommendService.allRecommend(articleId));
    }

    @PostMapping("/")
    public ResponseEntity<MessageDto> postRecommend(@RequestBody PostRecommendDto dto) {
        recommendService.createRecommend(dto.getId());
        return ResponseEntity.ok(new MessageDto("Success"));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteRecommend(@RequestParam(name = "id") Long articleId) {
        recommendService.removeRecommend(articleId);
        return ResponseEntity.ok(new MessageDto("Success"));
    }

}

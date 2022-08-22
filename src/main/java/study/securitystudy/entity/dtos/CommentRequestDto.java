package study.securitystudy.entity.dtos;

import lombok.Getter;

@Getter
public class CommentRequestDto {
    private Long articleId;
    private String body;
}

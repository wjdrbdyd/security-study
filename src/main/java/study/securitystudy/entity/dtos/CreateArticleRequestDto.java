package study.securitystudy.entity.dtos;

import lombok.Getter;

@Getter
public class CreateArticleRequestDto {
    private String title;
    private String body;
}

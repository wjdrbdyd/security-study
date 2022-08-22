package study.securitystudy.entity.dtos;

import lombok.Getter;

@Getter
public class ChangeArticleRequestDto {
    private Long id;
    private String title;
    private String body;
}

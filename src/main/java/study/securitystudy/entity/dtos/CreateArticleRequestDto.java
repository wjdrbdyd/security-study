package study.securitystudy.entity.dtos;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CreateArticleRequestDto {
    private String title;
    private String body;
}

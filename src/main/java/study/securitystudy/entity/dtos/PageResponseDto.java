package study.securitystudy.entity.dtos;

import lombok.Builder;
import lombok.Getter;
import study.securitystudy.entity.Article;
import study.securitystudy.entity.audit.BaseEntity;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class PageResponseDto {
    private Long articleId;
    private String articleTitle;
    private String memberNickname;
    private String createdDt;


    // of 요건 보통 entity -> dto 변환할 때 사용 하는듯?
    // Article객체를 DTO로 변환시켜주는 Builder
    public static PageResponseDto of(Article article) {
        return PageResponseDto.builder()
                .articleId(article.getArticleId())
                .articleTitle(article.getTitle())
                .memberNickname(article.getMember().getNickname())
                .createdDt(article.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }
}

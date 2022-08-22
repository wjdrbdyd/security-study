package study.securitystudy.entity.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import study.securitystudy.entity.Article;

import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleResponseDto {
    private Long articleId;
    private String memberNickname;
    private String articleTitle;
    private String articleBody;
    private String createdDt;
    private String lastModifiedDt;
    private boolean isWritten;

    public static ArticleResponseDto of(Article article, boolean bool) {
        return ArticleResponseDto.builder()
                .articleId(article.getArticleId())
                .memberNickname(article.getMember().getNickname())
                .articleTitle(article.getTitle())
                .articleBody(article.getBody())
                .createdDt(article.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .lastModifiedDt(article.getLastModifiedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .isWritten(bool)
                .build();
    }
}

package study.securitystudy.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import study.securitystudy.entity.Article;
import study.securitystudy.entity.dtos.PageResponseDto;


import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

import static study.securitystudy.entity.QArticle.*;

public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ArticleRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<PageResponseDto> searchAll(Pageable pageable) {
        List<Article> content = queryFactory
                .selectFrom(article)
                .orderBy(article.articleId.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<PageResponseDto> pages = content.stream()
                .map(PageResponseDto::of)
                .collect(Collectors.toList());

        int totalSize = queryFactory
                .selectFrom(article)
                .fetch()
                .size();

        return new PageImpl<>(pages, pageable, totalSize);
    }
}

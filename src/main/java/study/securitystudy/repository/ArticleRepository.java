package study.securitystudy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import study.securitystudy.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleRepositoryCustom {
}

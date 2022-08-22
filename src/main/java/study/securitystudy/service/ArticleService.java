package study.securitystudy.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import study.securitystudy.entity.Article;
import study.securitystudy.entity.Member;
import study.securitystudy.entity.Recommend;
import study.securitystudy.entity.dtos.ArticleResponseDto;
import study.securitystudy.entity.dtos.PageResponseDto;
import study.securitystudy.entity.dtos.RecommendDto;
import study.securitystudy.repository.ArticleRepository;
import study.securitystudy.repository.MemberRepository;
import study.securitystudy.repository.RecommendRepository;
import study.securitystudy.security.config.SecurityUtil;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    private final MemberRepository memberRepository;

    private final RecommendRepository recommendRepository;

    public List<PageResponseDto> allArticle() {

        List<Article> articles = articleRepository.findAll();

        return articles.stream()
                .map(PageResponseDto::of)
                .collect(Collectors.toList());
    }

    public Page<PageResponseDto> pageArticle(int pageNum) {
        return articleRepository.searchAll(PageRequest.of(pageNum - 1, 20));
    }

    // 게시물 조회
    public ArticleResponseDto oneArticle(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return ArticleResponseDto.of(article, false);
        } else {
            Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result = article.getMember().equals(member);
            return ArticleResponseDto.of(article, result);
        }
    }

    // 게시물 생성
    @Transactional
    public ArticleResponseDto postArticle(String title, String body) {
        Member member = isMemberCurrent();

        Article article = Article.createArticle(title, body, member);
        return ArticleResponseDto.of(articleRepository.save(article), true);
    }

    @Transactional
    public ArticleResponseDto changeArticle(Long id, String title, String body) {
        Article article = authorizationArticleWriter(id);
        return ArticleResponseDto.of(articleRepository.save(Article.changeArticle(article, title, body)), true);

    }

    @Transactional
    public void deleteArticle(Long id) {
        Article article = authorizationArticleWriter(id);
        articleRepository.delete(article);
    }

    private Member isMemberCurrent() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    public Article authorizationArticleWriter(Long id) {
        Member member = isMemberCurrent();
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다"));

        if(!article.getMember().equals(member)) {
            throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
        }
        return article;
    }
}

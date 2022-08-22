package study.securitystudy.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import study.securitystudy.entity.dtos.PageResponseDto;

public interface ArticleRepositoryCustom {
    Page<PageResponseDto> searchAll(Pageable pageable);

}

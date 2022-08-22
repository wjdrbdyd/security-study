package study.securitystudy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import study.securitystudy.entity.Member;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    
    // 이메일로 Member 조회
    Optional<Member> findByEmail(String email);

    // 이메일 존재하는지 판별
    boolean existsByEmail(String email);
    
}

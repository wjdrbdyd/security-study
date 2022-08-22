package study.securitystudy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import study.securitystudy.entity.enums.Authority;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    public void setNickname(String username) {
        this.nickname = username;
    }

    public void setPassword(String password) { this.password = password; }

    @Builder
    public Member(Long memberId, String email, String password, String nickname, Authority authority) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.authority = authority;
    }
}

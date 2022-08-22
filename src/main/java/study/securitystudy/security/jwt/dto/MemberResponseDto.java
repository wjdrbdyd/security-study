package study.securitystudy.security.jwt.dto;

import lombok.*;
import study.securitystudy.entity.Member;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MemberResponseDto {
    private String email;
    private String nickname;

    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .build();
    }
}
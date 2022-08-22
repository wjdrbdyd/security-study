package study.securitystudy.entity.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import study.securitystudy.entity.Comment;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponseDto {
    private Long commentId;
    private String memberNickname;
    private String commentBody;
    private Long createdDt;
    private boolean isWritten;

    public static CommentResponseDto of(Comment comment, boolean bool) {
        return CommentResponseDto.builder()
                .commentId(comment.getCommentId())
                .memberNickname(comment.getMember().getNickname())
                .commentBody(comment.getText())
                .createdDt(Timestamp.valueOf(comment.getCreatedDate()).getTime())
                .isWritten(bool)
                .build();
    }
}

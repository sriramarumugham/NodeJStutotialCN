class PostComments {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    // this.commentsContaienr=$(`post-comments-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);
    this.self = this;
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    console.log(this.newCommentForm);
    console.log(this.postId);
    this.newCommentForm.submit(function (e) {
      // alert("submit");
      console.log(this);
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-button", newComment));
          new Noty({
            theme: "relax",
            text: "Comment created",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newCommentDom(comment) {
    console.log("creating a comment");
    // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
    return $(`<li id="comment-${comment._id}">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>    

                </li>`);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}

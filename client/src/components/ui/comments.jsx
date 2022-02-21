import React from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { comments, createComment, removeComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
    };

    const handleRemoveComment = (id) => {
        removeComment(id);
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <div className="col-md-8">
            <AddCommentForm onSubmit={handleSubmit} />
            {sortedComments.length > 0 && (
                <CommentsList
                    comments={comments}
                    onRemove={handleRemoveComment}
                />
            )}
        </div>
    );
};
Comments.propTypes = {
    userId: PropTypes.string.isRequired
};
export default Comments;

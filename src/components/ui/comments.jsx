import React, { useEffect, useState } from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import api from "../../api";
import PropTypes from "prop-types";
import { orderBy } from "lodash";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((id) => setComments(comments.filter((x) => x._id !== id)));
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

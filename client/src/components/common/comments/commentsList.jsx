import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemove }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {comments &&
                    comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            {...comment}
                            onRemove={onRemove}
                        />
                    ))}
            </div>
        </div>
    );
};
CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};
export default CommentsList;

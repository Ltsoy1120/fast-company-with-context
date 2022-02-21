import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getComments();
    }, [userId]);

    const createComment = async (data) => {
        const comment = {
            ...data,
            _id: nanoid(),
            userId: currentUser._id,
            pageId: userId,
            created_at: Date.now()
        };
        try {
            const { content } = await commentService.create(comment);
            setComments((prev) => [...prev, content]);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getComments = async () => {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    const removeComment = async (id) => {
        try {
            const { content } = await commentService.remove(id);
            if (content === null) {
                setComments((prev) => prev.filter((com) => com._id !== id));
            }
        } catch (error) {
            errorCatcher(error);
        }
    };

    const errorCatcher = (error) => {
        const { message } = error.response.data.error;
        setError(message);
    };
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, removeComment, isLoading }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

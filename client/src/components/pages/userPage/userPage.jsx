import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUser";
import { CommentsProvider } from "../../../hooks/useComments";
import { useAuth } from "../../../hooks/useAuth";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();
    const { currentUser } = useAuth();
    let user = getUserById(userId);
    if (currentUser._id === userId) {
        user = currentUser;
    }
    return (
        <>
            {user && (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard user={user} />
                            <MeetingsCard user={user} />
                        </div>
                        <CommentsProvider>
                            <Comments userId={userId} />
                        </CommentsProvider>
                    </div>
                </div>
            )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;

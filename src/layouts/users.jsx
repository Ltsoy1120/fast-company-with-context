import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/pages/editUserPage";
import UserPage from "../components/pages/userPage";
import UsersListPage from "../components/pages/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;

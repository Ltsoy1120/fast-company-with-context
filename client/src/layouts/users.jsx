import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/pages/editUserPage";
import UserPage from "../components/pages/userPage";
import UsersListPage from "../components/pages/usersListPage";
import { UsersProvider } from "../hooks/useUser";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            <UsersProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersProvider>
        </>
    );
};

export default Users;

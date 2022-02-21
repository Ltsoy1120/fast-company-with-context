import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { content } = await userService.get();
                setUsers(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getUsers();
    }, []);

    const getUserById = (userId) => {
        return users.find((user) => user._id === userId);
    };

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        toast.error(message);
        setLoading(false);
    };
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};
UsersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

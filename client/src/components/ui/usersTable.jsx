import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import { Link } from "react-router-dom";
import Table, { TableBody, TableHeader } from "../common/table";
import QualitiesList from "./qualieties";
import Profession from "./profession";

const UsersTable = ({ users, selectedSort, onSort, onBookmark }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        profession: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    onClick={() => onBookmark(user._id)}
                    status={user.bookmark}
                />
            )
        }
    };
    // два варианта рендеринга таблицы с children и без
    return (
        <Table>
            <TableHeader {...{ selectedSort, onSort, columns }} />
            <TableBody {...{ data: users, columns }} />
        </Table>
        // <Table
        //     selectedSort={selectedSort}
        //     onSort={onSort}
        //     columns={columns}
        //     data={users}
        // />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onBookmark: PropTypes.func.isRequired
};
export default UsersTable;

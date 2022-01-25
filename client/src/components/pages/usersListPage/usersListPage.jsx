import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";

const UsersListPage = () => {
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleBookmark = (userId) => {
        const newUsers = [...users];
        const index = newUsers.findIndex((user) => user._id === userId);
        newUsers[index].bookmark = !newUsers[index].bookmark;
        setUsers(newUsers);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf();
        setSearchQuery(target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = searchQuery
            ? users.filter((user) =>
                  user.name
                      .toLowerCase()
                      .includes(searchQuery.toLocaleLowerCase())
              )
            : selectedProf
            ? users.filter(
                  // user => _.isEqual(user.profession, selectedProf)
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
        const count = filteredUsers && filteredUsers.length;
        // сортировка массива с помощью метода lodash
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        // if (!users.length && currentPage) {
        //     handlePageChange(currentPage - 1);
        // }
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            // <div className="container mt-5"></div>
            <div className="d-flex align-items-start">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 me-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus count={count} />
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onDelete={handleDelete}
                            onBookmark={handleBookmark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading";
};

export default UsersListPage;

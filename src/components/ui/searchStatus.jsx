import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ count }) => {
    const renderPhrase = (number) => {
        if (number > 4 && number < 15) {
            return "человек тусанет";
        }
        const lastOne = Number(number.toString().slice(-1));
        if ([2, 3, 4].indexOf(lastOne) !== -1) {
            return "человека тусанут";
        }
        if (lastOne === 1) {
            return "человек тусанет";
        }
    };
    return (
        <span
            className={
                "badge fs-4 mb-2 bg-" + (count > 0 ? "primary" : "danger")
            }
        >
            {count > 0
                ? `${count} ${renderPhrase(count)} с тобой сегодня`
                : "Никто с тобой не тусанет"}
        </span>
    );
};
SearchStatus.propTypes = {
    count: PropTypes.number.isRequired
};

export default SearchStatus;

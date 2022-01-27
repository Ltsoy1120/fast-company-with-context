import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getPropfessionById } = useProfession();
    const profession = getPropfessionById(id);

    return <>{!isLoading ? <div>{profession.name}</div> : "Loading...."}</>;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;

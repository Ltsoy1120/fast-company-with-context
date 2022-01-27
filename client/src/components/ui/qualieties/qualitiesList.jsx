import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQuality();

    return (
        <>
            {!isLoading
                ? qualities.map((qualitie) => (
                      <Qualitie key={qualitie} id={qualitie} />
                  ))
                : "Loading..."}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;

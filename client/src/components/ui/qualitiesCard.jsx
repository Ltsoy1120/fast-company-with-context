import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualieties";

const QualitiesCard = ({ user }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <QualitiesList qualities={user.qualities} />
            </div>
        </div>
    );
};
QualitiesCard.propTypes = {
    user: PropTypes.object
};
export default QualitiesCard;

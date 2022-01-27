import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getQualities = async () => {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    useEffect(() => {
        getQualities();
    }, []);
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        toast.error(message);
        setLoading(false);
    };
    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    return (
        <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

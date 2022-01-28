import React, { useContext, useState, useEffect } from "react";
import professionService from "../services/profession.service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

// чтобы не писать во всех компонентах лишний код, можно создать хук
export const useProfession = () => {
    return useContext(ProfessionContext);
};

// вариант передачи контекста через HOC
export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getProfessions = async () => {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    useEffect(() => {
        getProfessions();
    }, []);

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        toast.error(message);
        setLoading(false);
    };

    const getPropfessionById = (id) => {
        return professions.find((p) => p._id === id);
    };

    return (
        <ProfessionContext.Provider
            value={{ professions, isLoading, getPropfessionById }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

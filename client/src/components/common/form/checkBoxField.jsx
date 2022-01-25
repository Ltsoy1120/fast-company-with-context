import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, children, value, onChange, error }) => {
    const getClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className="form-check-label " htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
CheckBoxField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};
export default CheckBoxField;

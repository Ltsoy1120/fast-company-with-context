import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../form/textField";
import validator from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../form/selectField";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            name: users[userId].name,
            _id: users[userId]._id
        }));

    return (
        <div className="card mb-2">
            <div className="card-body">
                <h2>New comment</h2>
                <form onSubmit={handleSubmit}>
                    <SelectField
                        name="userId"
                        value={data.userId}
                        onChange={handleChange}
                        defaultOption="Выберите пользователя"
                        error={errors.userId}
                        options={arrayOfUsers}
                    />
                    <TextAreaField
                        value={data.content}
                        onChange={handleChange}
                        name="content"
                        label="Сообщение"
                        error={errors.content}
                    />
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary">
                            Опубликовать
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
export default AddCommentForm;

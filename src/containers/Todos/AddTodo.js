import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Heading from "../../components/UI/Headings/Heading";
import Button from "../../components/UI/Forms/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Forms/Input/Input";
import Message from "../../components/UI/Message/Message";
import { StyledForm } from "../../hoc/layout/elements";

import * as actions from "../../store/actions";

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    justify-content: space-around;
`;

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    width: 100%;
    padding: 0 3rem;
    bottom: 0;
`;

const TodoSchema = Yup.object().shape({
    todo: Yup.string()
        .required("The todo is required.")
        .min(2, "Too short")
});

const AddTodo = ({ addTodo, error, loading }) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <>
            <Button color="main" contain onClick={() => setIsOpened(true)}>
                Add Todo
            </Button>
            <Modal opened={isOpened} close={() => setIsOpened(false)}>
                <Heading noMargin size="h1" color="white">
                    Add your new todo
                </Heading>
                <Heading bold size="h4" color="white">
                    Type your todo and press add
                </Heading>
                <Formik
                    initialValues={{
                        todo: ""
                    }}
                    validationSchema={TodoSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        const res = await addTodo(values);
                        if (res) {
                            setIsOpened(false);
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, isValid }) => (
                        <StyledForm>
                            <Field
                                type="text"
                                name="todo"
                                placeholder="Write your todo..."
                                component={Input}
                            />
                            <ButtonsWrapper>
                                <Button
                                    contain
                                    color="main"
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                    oading={loading ? "Adding..." : null}
                                >
                                    Add todo
                                </Button>
                                <Button
                                    color="main"
                                    contain
                                    onClick={() => setIsOpened(false)}
                                >
                                    Cancel
                                </Button>
                            </ButtonsWrapper>
                            <MessageWrapper>
                                <Message error show={error}>
                                    {error}
                                </Message>
                            </MessageWrapper>
                        </StyledForm>
                    )}
                </Formik>

                <MessageWrapper>
                    {/* <Message error show={errorDelete}>
            {errorDelete}
          </Message> */}
                </MessageWrapper>
            </Modal>
        </>
    );
};

const mapStateToProps = ({ todos }) => ({
    loading: todos.loading,
    error: todos.error
});

const mapDispatchToProps = {
    addTodo: actions.addTodo
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodo);

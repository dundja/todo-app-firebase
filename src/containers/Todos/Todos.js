import React, { useState } from "react";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Heading from "../../components/UI/Headings/Heading";
import { Container } from "../../hoc/layout/elements";
import AddTodo from "./AddTodo";

const Wrapper = styled.div`
    width: 100%;
    align-self: flex-start;
    height: 100%;
    min-height: calc(100vh - 6rem);
    background-color: var(--color-mainLight);
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 4rem;
`;

const Todos = ({ todos, userId, loading, requested }) => {
    console.log(loading);
    let content;

    if (loading) {
        content = <p>Loading...</p>;
    } else if (requested && todos[userId].todos.length === 0) {
        content = <p>You have no todos...</p>;
    } else {
        content = `You have ${todos.userId.todos.length} todos`;
    }

    return (
        <Wrapper>
            <Container>
                <InnerWrapper>
                    <Heading noMargin size="h1" color="white">
                        Your todos
                    </Heading>
                    <Heading bold size="h4" color="white">
                        All you have to do for now
                    </Heading>
                    <AddTodo />
                    {content}
                </InnerWrapper>
            </Container>
        </Wrapper>
    );
};

const mapStateToProps = ({ firebase, firestore }) => ({
    userId: firebase.auth.uid,
    todos: firestore.data.todos,
    loading: firestore.status.requesting,
    requested: firestore.status.requested
});

const mapDispatchToProps = {};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(props => [`todos/${props.userId}`])
)(Todos);

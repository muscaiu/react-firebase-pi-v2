import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

export default compose(
    firestoreConnect([
        {
            collection: 'status', limit: 1, orderBy: ['createdAt', 'desc']
        }
    ]),
    connect(({ firebase: { ordered, profile } }) => ({
        todos: ordered.todos,
        uid: profile.uid
    }))
);


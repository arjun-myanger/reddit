import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation MyMutation (
        $body: String!
        $title: String!
        $image: String!
        $username: String!
        $subreddit_id: ID!
    ) {
        insertPost(
            body: $body
            image: $image
            subreddit_id: $subreddit_id
            title: $title
            username: $username
        ) {
            id
            body
            image
            subreddit_id
            title
            username
        }
    }
`

export const ADD_SUBREDDIT = gql`
    mutation MyMutation ($topic: String!) {
        insertSubreddit(topic: $topic) {
            id
            topic
            created_at
        }
    }
`
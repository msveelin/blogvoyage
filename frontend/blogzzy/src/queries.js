import gql from "graphql-tag";

export const SITE_INFO = gql`
  query {
    site {
      name
    }
    allPosts {
      title
      slug
      content
      featuredImage
      isPublished
      isFeatured
      createdAt
      modifiedAt
    }
  }
`;

export const CATEGORY = gql`
query{
allCategories {
  id
  name
}
}`

export const POSTS_BY_CATEGORY = gql`
  query ($category: String!) {
    postsByCategory(category: $category) {
      title
      slug
      content
      featuredImage
      isPublished
      isFeatured
      createdAt
    }
  }
`;

export const POST_BY_SLUG = gql`
  query ($slug: String!) {
    postBySlug(slug: $slug) {
    id
      title
    content
    slug
    featuredImage
    createdAt
    likesCount
    comments{
      id
      content
      likesCount
      createdAt
      user{
        username
      }
    }
    }
  }
`;

export const UPDATE_POST_LIKE = gql`
  mutation($postId: ID!, $userId: ID!) {
  updatePostLikes(postId: $postId, userId: $userId) {
    post{
      id
      title
      likes{
        id
      }
    }
  }
}
`;

export const UPDATE_COMMENT_LIKE = gql`
  mutation($commentId: ID!, $userId: ID!) {
    updateCommentLikes(commentId: $commentId, userId: $userId) {
      comment {
      likesCount
      likes {
        id
      }
    }
  }
}
`;

export const SUBMIT_COMMENT = gql`
  mutation ($content: String!, $userId: ID!, $postId: ID!) {
    createComment(content: $content, userId: $userId, postId: $postId) {
      comment {
        content
      }
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation($title: String!, $slug: String!, $content: String!, $userId: ID!, $categoryId: ID!, $featuredImage: String!) {
    createPost(
      title: $title, 
      slug: $slug, 
      content: $content, 
      userId: $userId, 
      categoryId: $categoryId, 
      featuredImage: $featuredImage) {
      post {
        title
        content
        slug
        featuredImage
        category{
          id
          name
        }
        user{
        id
        }
      }
    }
  }
`;

export const USER_SIGNIN = gql`
mutation ($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password){
    token
    user{
      id
      username
      email
    }
  }
}`

import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Id: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: UserResponse;
  forgotPassword: Scalars["Boolean"];
  login: UserResponse;
  register: UserResponse;
  revokeRefreshTokenForUser: Scalars["Boolean"];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  options: UserInput;
};

export type MutationRegisterArgs = {
  options: UserInput;
};

export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  bye: Scalars["String"];
  hello: Scalars["String"];
  me?: Maybe<UserResponse>;
};

export type QueryMeArgs = {
  accessToken: Scalars["String"];
};

export type UserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  accessToken?: Maybe<Scalars["String"]>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Users>;
};

export type Users = {
  __typename?: "Users";
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["Float"];
  role: Scalars["String"];
  tokenVersion: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
};

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars["String"];
  token: Scalars["String"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "Users";
      id: number;
      email: string;
      role: string;
    } | null;
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
  options: UserInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    accessToken?: string | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    accessToken?: string | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type ByeQueryVariables = Exact<{ [key: string]: never }>;

export type ByeQuery = { __typename?: "Query"; bye: string };

export type MeQueryVariables = Exact<{
  accessToken: Scalars["String"];
}>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "Users";
      email: string;
      id: number;
      role: string;
      tokenVersion: number;
    } | null;
  } | null;
};

export const ChangePasswordDocument = gql`
  mutation ChangePassword($newPassword: String!, $token: String!) {
    changePassword(newPassword: $newPassword, token: $token) {
      errors {
        field
        message
      }
      user {
        id
        email
        role
      }
    }
  }
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($options: UserInput!) {
    login(options: $options) {
      errors {
        field
        message
      }
      accessToken
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const RegisterDocument = gql`
  mutation Register($options: UserInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      accessToken
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const ByeDocument = gql`
  query Bye {
    bye
  }
`;

export function useByeQuery(
  options?: Omit<Urql.UseQueryArgs<ByeQueryVariables>, "query">
) {
  return Urql.useQuery<ByeQuery, ByeQueryVariables>({
    query: ByeDocument,
    ...options,
  });
}
export const MeDocument = gql`
  query Me($accessToken: String!) {
    me(accessToken: $accessToken) {
      errors {
        field
        message
      }
      user {
        email
        id
        role
        tokenVersion
      }
    }
  }
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}

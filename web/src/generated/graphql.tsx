import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AssignedPersonnel = {
  __typename?: 'AssignedPersonnel';
  projectId: Scalars['Float'];
  user: Users;
  userId: Scalars['Float'];
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  message: Scalars['String'];
  ticketId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: Users;
  userId: Scalars['Float'];
};

export type CreateProjectInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['String'];
  type: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignUser: Scalars['Boolean'];
  changePassword: UserResponse;
  createComment: Comment;
  createNotification: Notification;
  createProject: Project;
  createTicket: Ticket;
  deleteNotification: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  unassignUser: Scalars['Boolean'];
  updateNotification?: Maybe<Notification>;
  updateProject?: Maybe<Project>;
};


export type MutationAssignUserArgs = {
  projectId: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  options: CreateComment;
};


export type MutationCreateNotificationArgs = {
  message: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  options: CreateProjectInput;
};


export type MutationCreateTicketArgs = {
  options: CreateTicketInput;
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  options: UserLogin;
};


export type MutationRegisterArgs = {
  options: UserRegister;
};


export type MutationUnassignUserArgs = {
  projectId: Scalars['Float'];
};


export type MutationUpdateNotificationArgs = {
  options: UpdateNotificationInput;
};


export type MutationUpdateProjectArgs = {
  options: UpdateProjectInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  message: Scalars['String'];
  read: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  priority: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectByPriority = {
  __typename?: 'ProjectByPriority';
  high: Scalars['String'];
  immediate: Scalars['String'];
  low: Scalars['String'];
  medium: Scalars['String'];
};

export type ProjectByStatus = {
  __typename?: 'ProjectByStatus';
  in_progress: Scalars['String'];
  new: Scalars['String'];
  resolved: Scalars['String'];
};

export type ProjectByType = {
  __typename?: 'ProjectByType';
  bug: Scalars['String'];
  feature: Scalars['String'];
  issue: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  UserProjects: Array<User_Project>;
  assignedPersonnel: Array<AssignedPersonnel>;
  bye: Scalars['String'];
  comments: Array<Comment>;
  hello: Scalars['String'];
  me?: Maybe<Users>;
  notification?: Maybe<Notification>;
  notifications: Array<Notification>;
  project?: Maybe<Project>;
  projectByPriority: Array<ProjectByPriority>;
  projectByStatus: Array<ProjectByStatus>;
  projectByType: Array<ProjectByType>;
  projects: Array<Project>;
  tickets: Array<Ticket>;
  userComments: Array<Comment>;
  userNotifications: Array<Notification>;
  userTickets: Array<Ticket>;
  users: Array<Users>;
};


export type QueryAssignedPersonnelArgs = {
  projectId: Scalars['Float'];
};


export type QueryNotificationArgs = {
  id: Scalars['Float'];
};


export type QueryProjectArgs = {
  id: Scalars['Float'];
};


export type QueryUserTicketsArgs = {
  options: UserTickets;
};

export type Ticket = {
  __typename?: 'Ticket';
  description: Scalars['String'];
  developer: Scalars['String'];
  id: Scalars['Float'];
  priority: Scalars['String'];
  status: Scalars['String'];
  submitter: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateNotificationInput = {
  id: Scalars['Float'];
  read: Scalars['Boolean'];
};

export type UpdateProjectInput = {
  description: Scalars['String'];
  id?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  priority: Scalars['String'];
  type: Scalars['String'];
};

export type UserLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegister = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Users>;
};

export type User_Project = {
  __typename?: 'User_Project';
  project: Project;
  projectId: Scalars['Float'];
  user: Users;
  userId: Scalars['Float'];
};

export type Users = {
  __typename?: 'Users';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateComment = {
  message: Scalars['String'];
  ticketId: Scalars['Float'];
};

export type CreateTicketInput = {
  description: Scalars['String'];
  developer: Scalars['String'];
  priority: Scalars['String'];
  projectId: Scalars['Float'];
  status: Scalars['String'];
  submitter: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type UserTickets = {
  projectId: Scalars['Float'];
};

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'Users', id: number, email: string, role: string } | null } };

export type CreateNotificationMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification: { __typename?: 'Notification', id: number, message: string, read: boolean, createdAt: any, updatedAt: any } };

export type CreateProjectMutationVariables = Exact<{
  options: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: number, name: string, description: string, priority: string, type: string, status: string, createdAt: any, updatedAt: any } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  options: UserLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'Users', id: number, email: string, role: string, name: string, createdAt: any, updatedAt: any } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserRegister;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'Users', id: number, email: string, role: string, name: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateNotificationMutationVariables = Exact<{
  options: UpdateNotificationInput;
}>;


export type UpdateNotificationMutation = { __typename?: 'Mutation', updateNotification?: { __typename?: 'Notification', id: number, message: string, read: boolean, createdAt: any, updatedAt: any } | null };

export type AssignedPersonnelQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type AssignedPersonnelQuery = { __typename?: 'Query', assignedPersonnel: Array<{ __typename?: 'AssignedPersonnel', user: { __typename?: 'Users', id: number, email: string, role: string, name: string } }> };

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = { __typename?: 'Query', bye: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', id: number, role: string } | null };

export type ProjectQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: number, name: string, description: string, priority: string, type: string, status: string, createdAt: any, updatedAt: any } | null };

export type ProjectByPriorityQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectByPriorityQuery = { __typename?: 'Query', projectByPriority: Array<{ __typename?: 'ProjectByPriority', low: string, medium: string, high: string, immediate: string }> };

export type ProjectByStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectByStatusQuery = { __typename?: 'Query', projectByStatus: Array<{ __typename?: 'ProjectByStatus', new: string, in_progress: string, resolved: string }> };

export type ProjectByTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectByTypeQuery = { __typename?: 'Query', projectByType: Array<{ __typename?: 'ProjectByType', issue: string, bug: string, feature: string }> };

export type UserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNotificationsQuery = { __typename?: 'Query', userNotifications: Array<{ __typename?: 'Notification', id: number, message: string, read: boolean, createdAt: any, updatedAt: any }> };

export type UserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProjectsQuery = { __typename?: 'Query', UserProjects: Array<{ __typename?: 'User_Project', projectId: number, userId: number, project: { __typename?: 'Project', id: number, name: string, description: string } }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', name: string, id: number, email: string }> };


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
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateNotificationDocument = gql`
    mutation CreateNotification($message: String!) {
  createNotification(message: $message) {
    id
    message
    read
    createdAt
    updatedAt
  }
}
    `;

export function useCreateNotificationMutation() {
  return Urql.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument);
};
export const CreateProjectDocument = gql`
    mutation CreateProject($options: CreateProjectInput!) {
  createProject(options: $options) {
    id
    name
    description
    priority
    type
    status
    createdAt
    updatedAt
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UserLogin!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      email
      role
      name
      createdAt
      updatedAt
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserRegister!) {
  register(options: $options) {
    user {
      id
      email
      role
      name
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateNotificationDocument = gql`
    mutation UpdateNotification($options: UpdateNotificationInput!) {
  updateNotification(options: $options) {
    id
    message
    read
    createdAt
    updatedAt
  }
}
    `;

export function useUpdateNotificationMutation() {
  return Urql.useMutation<UpdateNotificationMutation, UpdateNotificationMutationVariables>(UpdateNotificationDocument);
};
export const AssignedPersonnelDocument = gql`
    query AssignedPersonnel($projectId: Float!) {
  assignedPersonnel(projectId: $projectId) {
    user {
      id
      email
      role
      name
    }
  }
}
    `;

export function useAssignedPersonnelQuery(options: Omit<Urql.UseQueryArgs<AssignedPersonnelQueryVariables>, 'query'>) {
  return Urql.useQuery<AssignedPersonnelQuery, AssignedPersonnelQueryVariables>({ query: AssignedPersonnelDocument, ...options });
};
export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

export function useByeQuery(options?: Omit<Urql.UseQueryArgs<ByeQueryVariables>, 'query'>) {
  return Urql.useQuery<ByeQuery, ByeQueryVariables>({ query: ByeDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    role
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const ProjectDocument = gql`
    query Project($projectId: Float!) {
  project(id: $projectId) {
    id
    name
    description
    priority
    type
    status
    createdAt
    updatedAt
  }
}
    `;

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectQuery, ProjectQueryVariables>({ query: ProjectDocument, ...options });
};
export const ProjectByPriorityDocument = gql`
    query ProjectByPriority {
  projectByPriority {
    low
    medium
    high
    immediate
  }
}
    `;

export function useProjectByPriorityQuery(options?: Omit<Urql.UseQueryArgs<ProjectByPriorityQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectByPriorityQuery, ProjectByPriorityQueryVariables>({ query: ProjectByPriorityDocument, ...options });
};
export const ProjectByStatusDocument = gql`
    query ProjectByStatus {
  projectByStatus {
    new
    in_progress
    resolved
  }
}
    `;

export function useProjectByStatusQuery(options?: Omit<Urql.UseQueryArgs<ProjectByStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectByStatusQuery, ProjectByStatusQueryVariables>({ query: ProjectByStatusDocument, ...options });
};
export const ProjectByTypeDocument = gql`
    query ProjectByType {
  projectByType {
    issue
    bug
    feature
  }
}
    `;

export function useProjectByTypeQuery(options?: Omit<Urql.UseQueryArgs<ProjectByTypeQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectByTypeQuery, ProjectByTypeQueryVariables>({ query: ProjectByTypeDocument, ...options });
};
export const UserNotificationsDocument = gql`
    query UserNotifications {
  userNotifications {
    id
    message
    read
    createdAt
    updatedAt
  }
}
    `;

export function useUserNotificationsQuery(options?: Omit<Urql.UseQueryArgs<UserNotificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserNotificationsQuery, UserNotificationsQueryVariables>({ query: UserNotificationsDocument, ...options });
};
export const UserProjectsDocument = gql`
    query UserProjects {
  UserProjects {
    projectId
    userId
    project {
      id
      name
      description
    }
  }
}
    `;

export function useUserProjectsQuery(options?: Omit<Urql.UseQueryArgs<UserProjectsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserProjectsQuery, UserProjectsQueryVariables>({ query: UserProjectsDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    name
    id
    email
  }
}
    `;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};
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

export type AssignedDeveloper = {
  __typename?: 'AssignedDeveloper';
  ticketId: Scalars['Float'];
  user: Users;
  userId: Scalars['Float'];
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
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignUsers: Scalars['Boolean'];
  changePassword: UserResponse;
  createComment: Scalars['Boolean'];
  createNotification: Notification;
  createProject: Project;
  createTicket: Ticket;
  deleteComment: Scalars['Boolean'];
  deleteNotification: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  unassignUser: Scalars['Boolean'];
  updateNotification?: Maybe<Notification>;
  updateProject?: Maybe<Project>;
  updateTicket?: Maybe<Ticket>;
};


export type MutationAssignUsersArgs = {
  projectId: Scalars['Float'];
  team: Array<AssignTeamInput>;
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
  team: Array<TeamMembers>;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float'];
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


export type MutationUpdateTicketArgs = {
  options: EditTicketInput;
  team: Array<TeamMembers>;
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
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  UserProjects: Array<User_Project>;
  assignedDevelopers: Array<AssignedDeveloper>;
  assignedPersonnel: Array<AssignedPersonnel>;
  avilableUsers: Array<Users>;
  bye: Scalars['String'];
  comments: Array<Comment>;
  hello: Scalars['String'];
  me?: Maybe<Users>;
  notification?: Maybe<Notification>;
  notifications: Array<Notification>;
  project?: Maybe<Project>;
  projectTickets: Array<Ticket>;
  projects: Array<Project>;
  ticket?: Maybe<Ticket>;
  ticketComments: Array<TicketComment>;
  tickets: Array<Ticket>;
  userNotifications: Array<Notification>;
  users: Array<Users>;
};


export type QueryAssignedDevelopersArgs = {
  ticketId: Scalars['Float'];
};


export type QueryAssignedPersonnelArgs = {
  projectId: Scalars['Float'];
};


export type QueryAvilableUsersArgs = {
  projectId: Scalars['Float'];
};


export type QueryNotificationArgs = {
  id: Scalars['Float'];
};


export type QueryProjectArgs = {
  id: Scalars['Float'];
};


export type QueryProjectTicketsArgs = {
  projectId: Scalars['Float'];
};


export type QueryTicketArgs = {
  id: Scalars['Float'];
};


export type QueryTicketCommentsArgs = {
  ticketId: Scalars['Float'];
};

export type Ticket = {
  __typename?: 'Ticket';
  creator: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  priority: Scalars['String'];
  projectId: Scalars['Float'];
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TicketComment = {
  __typename?: 'TicketComment';
  id: Scalars['Float'];
  message: Scalars['String'];
  user: Users;
};

export type UpdateNotificationInput = {
  id: Scalars['Float'];
  read: Scalars['Boolean'];
};

export type UpdateProjectInput = {
  description: Scalars['String'];
  id?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
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

export type AssignTeamInput = {
  id: Scalars['Float'];
};

export type CreateComment = {
  message: Scalars['String'];
  ticketId: Scalars['Float'];
};

export type CreateTicketInput = {
  creator: Scalars['String'];
  description: Scalars['String'];
  priority: Scalars['String'];
  projectId: Scalars['Float'];
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type EditTicketInput = {
  description: Scalars['String'];
  id: Scalars['Float'];
  priority: Scalars['String'];
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type TeamMembers = {
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  selected: Scalars['Boolean'];
};

export type AssignUsersMutationVariables = Exact<{
  team: Array<AssignTeamInput> | AssignTeamInput;
  projectId: Scalars['Float'];
}>;


export type AssignUsersMutation = { __typename?: 'Mutation', assignUsers: boolean };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'Users', id: number, email: string, role: string } | null } };

export type CreateCommentMutationVariables = Exact<{
  options: CreateComment;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: boolean };

export type CreateNotificationMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification: { __typename?: 'Notification', id: number, message: string, read: boolean, createdAt: any, updatedAt: any } };

export type CreateProjectMutationVariables = Exact<{
  options: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: number, name: string, description: string, createdAt: any, updatedAt: any } };

export type CreateTicketMutationVariables = Exact<{
  team: Array<TeamMembers> | TeamMembers;
  options: CreateTicketInput;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: { __typename?: 'Ticket', id: number, projectId: number, creator: string, title: string, description: string, priority: string, type: string, status: string, updatedAt: any } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['Float'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

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

export type UpdateTicketMutationVariables = Exact<{
  team: Array<TeamMembers> | TeamMembers;
  options: EditTicketInput;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket?: { __typename?: 'Ticket', id: number, projectId: number, creator: string, title: string, description: string, priority: string, type: string, status: string, updatedAt: any } | null };

export type AssignedDevelopersQueryVariables = Exact<{
  ticketId: Scalars['Float'];
}>;


export type AssignedDevelopersQuery = { __typename?: 'Query', assignedDevelopers: Array<{ __typename?: 'AssignedDeveloper', ticketId: number, userId: number, user: { __typename?: 'Users', id: number, name: string } }> };

export type AssignedPersonnelQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type AssignedPersonnelQuery = { __typename?: 'Query', assignedPersonnel: Array<{ __typename?: 'AssignedPersonnel', user: { __typename?: 'Users', id: number, email: string, name: string, role: string } }> };

export type AvilableUsersQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type AvilableUsersQuery = { __typename?: 'Query', avilableUsers: Array<{ __typename?: 'Users', id: number, name: string, email: string }> };

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = { __typename?: 'Query', bye: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', name: string, id: number, role: string } | null };

export type ProjectQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: number, name: string, description: string, createdAt: any, updatedAt: any } | null };

export type ProjectTicketsQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type ProjectTicketsQuery = { __typename?: 'Query', projectTickets: Array<{ __typename?: 'Ticket', id: number, projectId: number, creator: string, title: string, description: string, priority: string, type: string, status: string, updatedAt: any }> };

export type TicketQueryVariables = Exact<{
  ticketId: Scalars['Float'];
}>;


export type TicketQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', id: number, title: string, status: string, priority: string, creator: string, description: string, type: string } | null };

export type TicketCommentsQueryVariables = Exact<{
  ticketId: Scalars['Float'];
}>;


export type TicketCommentsQuery = { __typename?: 'Query', ticketComments: Array<{ __typename?: 'TicketComment', id: number, message: string, user: { __typename?: 'Users', id: number, name: string } }> };

export type UserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNotificationsQuery = { __typename?: 'Query', userNotifications: Array<{ __typename?: 'Notification', id: number, message: string, read: boolean, createdAt: any, updatedAt: any }> };

export type UserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProjectsQuery = { __typename?: 'Query', UserProjects: Array<{ __typename?: 'User_Project', projectId: number, userId: number, project: { __typename?: 'Project', id: number, name: string, description: string } }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', name: string, id: number, email: string }> };


export const AssignUsersDocument = gql`
    mutation AssignUsers($team: [assignTeamInput!]!, $projectId: Float!) {
  assignUsers(team: $team, projectId: $projectId)
}
    `;

export function useAssignUsersMutation() {
  return Urql.useMutation<AssignUsersMutation, AssignUsersMutationVariables>(AssignUsersDocument);
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
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateCommentDocument = gql`
    mutation CreateComment($options: createComment!) {
  createComment(options: $options)
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
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
    createdAt
    updatedAt
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const CreateTicketDocument = gql`
    mutation CreateTicket($team: [teamMembers!]!, $options: createTicketInput!) {
  createTicket(team: $team, options: $options) {
    id
    projectId
    creator
    title
    description
    priority
    type
    status
    updatedAt
  }
}
    `;

export function useCreateTicketMutation() {
  return Urql.useMutation<CreateTicketMutation, CreateTicketMutationVariables>(CreateTicketDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: Float!) {
  deleteComment(id: $deleteCommentId)
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
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
export const UpdateTicketDocument = gql`
    mutation UpdateTicket($team: [teamMembers!]!, $options: editTicketInput!) {
  updateTicket(team: $team, options: $options) {
    id
    projectId
    creator
    title
    description
    priority
    type
    status
    updatedAt
  }
}
    `;

export function useUpdateTicketMutation() {
  return Urql.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument);
};
export const AssignedDevelopersDocument = gql`
    query AssignedDevelopers($ticketId: Float!) {
  assignedDevelopers(ticketId: $ticketId) {
    ticketId
    userId
    user {
      id
      name
    }
  }
}
    `;

export function useAssignedDevelopersQuery(options: Omit<Urql.UseQueryArgs<AssignedDevelopersQueryVariables>, 'query'>) {
  return Urql.useQuery<AssignedDevelopersQuery, AssignedDevelopersQueryVariables>({ query: AssignedDevelopersDocument, ...options });
};
export const AssignedPersonnelDocument = gql`
    query AssignedPersonnel($projectId: Float!) {
  assignedPersonnel(projectId: $projectId) {
    user {
      id
      email
      name
      role
    }
  }
}
    `;

export function useAssignedPersonnelQuery(options: Omit<Urql.UseQueryArgs<AssignedPersonnelQueryVariables>, 'query'>) {
  return Urql.useQuery<AssignedPersonnelQuery, AssignedPersonnelQueryVariables>({ query: AssignedPersonnelDocument, ...options });
};
export const AvilableUsersDocument = gql`
    query AvilableUsers($projectId: Float!) {
  avilableUsers(projectId: $projectId) {
    id
    name
    email
  }
}
    `;

export function useAvilableUsersQuery(options: Omit<Urql.UseQueryArgs<AvilableUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<AvilableUsersQuery, AvilableUsersQueryVariables>({ query: AvilableUsersDocument, ...options });
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
    name
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
    createdAt
    updatedAt
  }
}
    `;

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectQuery, ProjectQueryVariables>({ query: ProjectDocument, ...options });
};
export const ProjectTicketsDocument = gql`
    query ProjectTickets($projectId: Float!) {
  projectTickets(projectId: $projectId) {
    id
    projectId
    creator
    title
    description
    priority
    type
    status
    updatedAt
  }
}
    `;

export function useProjectTicketsQuery(options: Omit<Urql.UseQueryArgs<ProjectTicketsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectTicketsQuery, ProjectTicketsQueryVariables>({ query: ProjectTicketsDocument, ...options });
};
export const TicketDocument = gql`
    query Ticket($ticketId: Float!) {
  ticket(id: $ticketId) {
    id
    title
    status
    priority
    creator
    description
    type
  }
}
    `;

export function useTicketQuery(options: Omit<Urql.UseQueryArgs<TicketQueryVariables>, 'query'>) {
  return Urql.useQuery<TicketQuery, TicketQueryVariables>({ query: TicketDocument, ...options });
};
export const TicketCommentsDocument = gql`
    query TicketComments($ticketId: Float!) {
  ticketComments(ticketId: $ticketId) {
    id
    message
    user {
      id
      name
    }
  }
}
    `;

export function useTicketCommentsQuery(options: Omit<Urql.UseQueryArgs<TicketCommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<TicketCommentsQuery, TicketCommentsQueryVariables>({ query: TicketCommentsDocument, ...options });
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
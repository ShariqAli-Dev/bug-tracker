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
  archiveProject: Scalars['Boolean'];
  archiveTicket?: Maybe<Ticket>;
  assignUsers: Scalars['Boolean'];
  changePassword: UserResponse;
  changeRole: Scalars['Boolean'];
  createComment: Scalars['Boolean'];
  createProject: Project;
  createTicket: Ticket;
  deleteComment: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteTicket: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  unassignUser: Scalars['Boolean'];
  updateProject?: Maybe<Project>;
  updateTicket?: Maybe<Ticket>;
};


export type MutationArchiveProjectArgs = {
  id: Scalars['Float'];
};


export type MutationArchiveTicketArgs = {
  id: Scalars['Float'];
};


export type MutationAssignUsersArgs = {
  isAdding: Scalars['Boolean'];
  projectId: Scalars['Float'];
  team: Array<AssignTeamInput>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangeRoleArgs = {
  role: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  options: CreateComment;
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


export type MutationDeleteProjectArgs = {
  projectId: Scalars['Float'];
};


export type MutationDeleteTicketArgs = {
  team?: InputMaybe<Array<DeleteDev>>;
  ticketId: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
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


export type MutationUpdateProjectArgs = {
  options: UpdateProjectInput;
};


export type MutationUpdateTicketArgs = {
  options: EditTicketInput;
  team: Array<TeamMembers>;
};

export type Project = {
  __typename?: 'Project';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  UserProjects: Array<User_Project>;
  archivedProjectTickets: Array<Ticket>;
  assignedDevelopers: Array<AssignedDeveloper>;
  assignedPersonnel: Array<AssignedPersonnel>;
  availableUsers: Array<Users>;
  bye: Scalars['String'];
  comments: Array<Comment>;
  hello: Scalars['String'];
  me?: Maybe<Users>;
  project?: Maybe<Project>;
  projectTickets: Array<Ticket>;
  projects: Array<Project>;
  ticket?: Maybe<Ticket>;
  ticketComments: Array<TicketComment>;
  tickets: Array<Ticket>;
  ticketsByPriority: TicketsByPriority;
  ticketsByStatus: TicketsByStatus;
  ticketsByType: TicketsByType;
  userTickets?: Maybe<Array<UserTicket>>;
  users: Array<Users>;
};


export type QueryArchivedProjectTicketsArgs = {
  projectId: Scalars['Float'];
};


export type QueryAssignedDevelopersArgs = {
  ticketId: Scalars['Float'];
};


export type QueryAssignedPersonnelArgs = {
  projectId: Scalars['Float'];
};


export type QueryAvailableUsersArgs = {
  isAdding: Scalars['Boolean'];
  projectId: Scalars['Float'];
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
  archived: Scalars['Boolean'];
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

export type TicketsByPriority = {
  __typename?: 'TicketsByPriority';
  high: Scalars['String'];
  immediate: Scalars['String'];
  low: Scalars['String'];
  medium: Scalars['String'];
};

export type TicketsByStatus = {
  __typename?: 'TicketsByStatus';
  in_progress: Scalars['String'];
  new: Scalars['String'];
  resolved: Scalars['String'];
};

export type TicketsByType = {
  __typename?: 'TicketsByType';
  bug: Scalars['String'];
  feature: Scalars['String'];
  issue: Scalars['String'];
};

export type UpdateProjectInput = {
  description: Scalars['String'];
  id: Scalars['Float'];
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

export type UserTicket = {
  __typename?: 'UserTicket';
  archived: Scalars['Boolean'];
  creator: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  priority: Scalars['String'];
  projectId: Scalars['Float'];
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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

export type DeleteDev = {
  userId: Scalars['Float'];
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

export type ArchiveProjectMutationVariables = Exact<{
  archiveProjectId: Scalars['Float'];
}>;


export type ArchiveProjectMutation = { __typename?: 'Mutation', archiveProject: boolean };

export type ArchiveTicketMutationVariables = Exact<{
  archiveTicketId: Scalars['Float'];
}>;


export type ArchiveTicketMutation = { __typename?: 'Mutation', archiveTicket?: { __typename?: 'Ticket', id: number, projectId: number, creator: string, title: string, description: string, priority: string, type: string, status: string, archived: boolean, updatedAt: any } | null };

export type AssignUsersMutationVariables = Exact<{
  isAdding: Scalars['Boolean'];
  team: Array<AssignTeamInput> | AssignTeamInput;
  projectId: Scalars['Float'];
}>;


export type AssignUsersMutation = { __typename?: 'Mutation', assignUsers: boolean };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'Users', id: number, email: string, role: string } | null } };

export type ChangeRoleMutationVariables = Exact<{
  role: Scalars['String'];
}>;


export type ChangeRoleMutation = { __typename?: 'Mutation', changeRole: boolean };

export type CreateCommentMutationVariables = Exact<{
  options: CreateComment;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: boolean };

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

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type DeleteTicketMutationVariables = Exact<{
  team: Array<DeleteDev> | DeleteDev;
  ticketId: Scalars['Float'];
}>;


export type DeleteTicketMutation = { __typename?: 'Mutation', deleteTicket: boolean };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Float'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

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

export type UpdateProjectMutationVariables = Exact<{
  options: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: number } | null };

export type UpdateTicketMutationVariables = Exact<{
  team: Array<TeamMembers> | TeamMembers;
  options: EditTicketInput;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket?: { __typename?: 'Ticket', id: number, projectId: number, creator: string, title: string, description: string, priority: string, type: string, status: string, updatedAt: any } | null };

export type ArchivedProjectTicketsQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type ArchivedProjectTicketsQuery = { __typename?: 'Query', archivedProjectTickets: Array<{ __typename?: 'Ticket', id: number, projectId: number, creator: string, title: string, description: string, priority: string, type: string, status: string, archived: boolean, updatedAt: any }> };

export type AssignedDevelopersQueryVariables = Exact<{
  ticketId: Scalars['Float'];
}>;


export type AssignedDevelopersQuery = { __typename?: 'Query', assignedDevelopers: Array<{ __typename?: 'AssignedDeveloper', ticketId: number, userId: number, user: { __typename?: 'Users', id: number, name: string } }> };

export type AssignedPersonnelQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type AssignedPersonnelQuery = { __typename?: 'Query', assignedPersonnel: Array<{ __typename?: 'AssignedPersonnel', user: { __typename?: 'Users', id: number, email: string, name: string, role: string } }> };

export type AvailableUsersQueryVariables = Exact<{
  isAdding: Scalars['Boolean'];
  projectId: Scalars['Float'];
}>;


export type AvailableUsersQuery = { __typename?: 'Query', availableUsers: Array<{ __typename?: 'Users', id: number, name: string, email: string }> };

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = { __typename?: 'Query', bye: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', name: string, id: number, role: string } | null };

export type ProjectQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: number, name: string, description: string, archived: boolean, createdAt: any, updatedAt: any } | null };

export type ProjectTicketsQueryVariables = Exact<{
  projectId: Scalars['Float'];
}>;


export type ProjectTicketsQuery = { __typename?: 'Query', projectTickets: Array<{ __typename?: 'Ticket', id: number, projectId: number, creator: string, title: string, description: string, archived: boolean, priority: string, type: string, status: string, updatedAt: any }> };

export type TicketQueryVariables = Exact<{
  ticketId: Scalars['Float'];
}>;


export type TicketQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', id: number, title: string, status: string, priority: string, creator: string, description: string, type: string } | null };

export type TicketCommentsQueryVariables = Exact<{
  ticketId: Scalars['Float'];
}>;


export type TicketCommentsQuery = { __typename?: 'Query', ticketComments: Array<{ __typename?: 'TicketComment', id: number, message: string, user: { __typename?: 'Users', id: number, name: string } }> };

export type TicketsByPriorityQueryVariables = Exact<{ [key: string]: never; }>;


export type TicketsByPriorityQuery = { __typename?: 'Query', ticketsByPriority: { __typename?: 'TicketsByPriority', low: string, medium: string, high: string, immediate: string } };

export type TicketsByStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type TicketsByStatusQuery = { __typename?: 'Query', ticketsByStatus: { __typename?: 'TicketsByStatus', new: string, in_progress: string, resolved: string } };

export type TicketsByTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type TicketsByTypeQuery = { __typename?: 'Query', ticketsByType: { __typename?: 'TicketsByType', feature: string, issue: string, bug: string } };

export type UserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProjectsQuery = { __typename?: 'Query', UserProjects: Array<{ __typename?: 'User_Project', projectId: number, userId: number, project: { __typename?: 'Project', id: number, name: string, description: string } }> };

export type UserTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserTicketsQuery = { __typename?: 'Query', userTickets?: Array<{ __typename?: 'UserTicket', creator: string, title: string, description: string, priority: string, type: string, status: string, name: string, projectId: number }> | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', id: number, email: string, role: string, name: string }> };


export const ArchiveProjectDocument = gql`
    mutation ArchiveProject($archiveProjectId: Float!) {
  archiveProject(id: $archiveProjectId)
}
    `;

export function useArchiveProjectMutation() {
  return Urql.useMutation<ArchiveProjectMutation, ArchiveProjectMutationVariables>(ArchiveProjectDocument);
};
export const ArchiveTicketDocument = gql`
    mutation ArchiveTicket($archiveTicketId: Float!) {
  archiveTicket(id: $archiveTicketId) {
    id
    projectId
    creator
    title
    description
    priority
    type
    status
    archived
    updatedAt
  }
}
    `;

export function useArchiveTicketMutation() {
  return Urql.useMutation<ArchiveTicketMutation, ArchiveTicketMutationVariables>(ArchiveTicketDocument);
};
export const AssignUsersDocument = gql`
    mutation AssignUsers($isAdding: Boolean!, $team: [assignTeamInput!]!, $projectId: Float!) {
  assignUsers(isAdding: $isAdding, team: $team, projectId: $projectId)
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
export const ChangeRoleDocument = gql`
    mutation ChangeRole($role: String!) {
  changeRole(role: $role)
}
    `;

export function useChangeRoleMutation() {
  return Urql.useMutation<ChangeRoleMutation, ChangeRoleMutationVariables>(ChangeRoleDocument);
};
export const CreateCommentDocument = gql`
    mutation CreateComment($options: createComment!) {
  createComment(options: $options)
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
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
export const DeleteProjectDocument = gql`
    mutation DeleteProject($projectId: Float!) {
  deleteProject(projectId: $projectId)
}
    `;

export function useDeleteProjectMutation() {
  return Urql.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument);
};
export const DeleteTicketDocument = gql`
    mutation DeleteTicket($team: [deleteDev!]!, $ticketId: Float!) {
  deleteTicket(team: $team, ticketId: $ticketId)
}
    `;

export function useDeleteTicketMutation() {
  return Urql.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: Float!) {
  deleteUser(id: $deleteUserId)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
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
export const UpdateProjectDocument = gql`
    mutation UpdateProject($options: UpdateProjectInput!) {
  updateProject(options: $options) {
    id
  }
}
    `;

export function useUpdateProjectMutation() {
  return Urql.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument);
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
export const ArchivedProjectTicketsDocument = gql`
    query ArchivedProjectTickets($projectId: Float!) {
  archivedProjectTickets(projectId: $projectId) {
    id
    projectId
    creator
    title
    description
    priority
    type
    status
    archived
    updatedAt
  }
}
    `;

export function useArchivedProjectTicketsQuery(options: Omit<Urql.UseQueryArgs<ArchivedProjectTicketsQueryVariables>, 'query'>) {
  return Urql.useQuery<ArchivedProjectTicketsQuery, ArchivedProjectTicketsQueryVariables>({ query: ArchivedProjectTicketsDocument, ...options });
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
export const AvailableUsersDocument = gql`
    query AvailableUsers($isAdding: Boolean!, $projectId: Float!) {
  availableUsers(isAdding: $isAdding, projectId: $projectId) {
    id
    name
    email
  }
}
    `;

export function useAvailableUsersQuery(options: Omit<Urql.UseQueryArgs<AvailableUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<AvailableUsersQuery, AvailableUsersQueryVariables>({ query: AvailableUsersDocument, ...options });
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
    archived
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
    archived
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
export const TicketsByPriorityDocument = gql`
    query TicketsByPriority {
  ticketsByPriority {
    low
    medium
    high
    immediate
  }
}
    `;

export function useTicketsByPriorityQuery(options?: Omit<Urql.UseQueryArgs<TicketsByPriorityQueryVariables>, 'query'>) {
  return Urql.useQuery<TicketsByPriorityQuery, TicketsByPriorityQueryVariables>({ query: TicketsByPriorityDocument, ...options });
};
export const TicketsByStatusDocument = gql`
    query TicketsByStatus {
  ticketsByStatus {
    new
    in_progress
    resolved
  }
}
    `;

export function useTicketsByStatusQuery(options?: Omit<Urql.UseQueryArgs<TicketsByStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<TicketsByStatusQuery, TicketsByStatusQueryVariables>({ query: TicketsByStatusDocument, ...options });
};
export const TicketsByTypeDocument = gql`
    query TicketsByType {
  ticketsByType {
    feature
    issue
    bug
  }
}
    `;

export function useTicketsByTypeQuery(options?: Omit<Urql.UseQueryArgs<TicketsByTypeQueryVariables>, 'query'>) {
  return Urql.useQuery<TicketsByTypeQuery, TicketsByTypeQueryVariables>({ query: TicketsByTypeDocument, ...options });
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
export const UserTicketsDocument = gql`
    query UserTickets {
  userTickets {
    creator
    title
    description
    priority
    type
    status
    name
    projectId
  }
}
    `;

export function useUserTicketsQuery(options?: Omit<Urql.UseQueryArgs<UserTicketsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserTicketsQuery, UserTicketsQueryVariables>({ query: UserTicketsDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    role
    name
  }
}
    `;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};
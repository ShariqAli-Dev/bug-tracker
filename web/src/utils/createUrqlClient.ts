import { cacheExchange } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, errorExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: () => {
      return {
        credentials: "include", // sends a cookie
      } as const;
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            deleteComment: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "ticketComments"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", fi.fieldName, fi.arguments);
              });
            },
            createComment: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "ticketComments"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", fi.fieldName, fi.arguments);
              });
            },
            assignUsers: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "assignedPersonnel"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", fi.fieldName, fi.arguments);
              });
            },
            createProject: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");

              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "UserProjects"
              );

              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", fi.fieldName, fi.arguments);
              });
            },
            createTicket: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "projectTickets"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", fi.fieldName, fi.arguments);
              });
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                {
                  query: MeDocument,
                },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                {
                  query: MeDocument,
                },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange({
        onError(err) {
          if (err.message.includes("not authenticated")) {
            Router.replace("/");
          }
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};

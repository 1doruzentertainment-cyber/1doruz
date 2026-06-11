/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as artists from "../artists.js";
import type * as auth from "../auth.js";
import type * as config from "../config.js";
import type * as contact from "../contact.js";
import type * as demos from "../demos.js";
import type * as emails from "../emails.js";
import type * as events from "../events.js";
import type * as gallery from "../gallery.js";
import type * as news from "../news.js";
import type * as releases from "../releases.js";
import type * as team from "../team.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  artists: typeof artists;
  auth: typeof auth;
  config: typeof config;
  contact: typeof contact;
  demos: typeof demos;
  emails: typeof emails;
  events: typeof events;
  gallery: typeof gallery;
  news: typeof news;
  releases: typeof releases;
  team: typeof team;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};

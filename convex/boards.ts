import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";

/**
 * @description Get all boards for an organization
 * @params {string} orgId
 */
export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const title = args.search ? args.search : "";

    if (args.favorites) {
      const favorites = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId),
        )
        .order("desc")
        .collect();
      const ids = favorites.map((favorite) => favorite.boardId);
      const boards = await getAllOrThrow(ctx.db, ids);

      if (title) {
        return boards
          .map((board) => {
            return { ...board, isFavorite: true };
          })
          .filter((board) => board.title.includes(title));
      }
      return boards.map((board) => {
        return { ...board, isFavorite: true };
      });
    }

    let boards;
    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId),
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardsWithFavorites = boards.map(async (board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board_org", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id),
        )
        .unique()
        .then((favorite) => {
          return { ...board, isFavorite: !!favorite };
        })
        .catch(() => {
          return { ...board, isFavorite: false };
        });
    });

    return Promise.all(boardsWithFavorites);
  },
});

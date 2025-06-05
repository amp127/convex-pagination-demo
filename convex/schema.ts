import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  companies: defineTable({
    companyName: v.string(),
    industry: v.string(),
    subscriptionTier: v.union(v.literal("Free"), v.literal("Starter"), v.literal("Professional")),
    logoUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    searchText: v.optional(v.string()),
  }).index("by_company_name", ["companyName"])
  .searchIndex("by_searchText", {
    searchField: "searchText",
    filterFields: ["industry"],
  }),
  
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }),
}); 
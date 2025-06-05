import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const listPaginatedWithSearch = query({
    args: {
      paginationOpts: paginationOptsValidator,
      search: v.optional(v.string()),
      industry: v.optional(v.string()),
      order: v.union(v.literal('asc'), v.literal('desc')),
    },
    handler: async (ctx, args) => {
      const query = ctx.db.query('companies')
  
      if (args.search) {
        return query
          .withSearchIndex('by_searchText', (q) => {
            let searchQuery = q.search('searchText', args.search ?? '')
            if (args.industry && args.industry !== 'all') {
              searchQuery = searchQuery.eq('industry', args.industry)
            }
            return searchQuery
          })
          .paginate(args.paginationOpts)
      }
      
      // When no search term but industry filter is applied
      if (args.industry && args.industry !== 'all') {
        return query
          .withIndex('by_company_name')
          .filter((q) => q.eq(q.field('industry'), args.industry))
          .order(args.order)
          .paginate(args.paginationOpts)
      }
  
      return await query.order(args.order).paginate(args.paginationOpts)
    },
  })

export const remove = mutation({
  args: { id: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const removeAll = mutation({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.db.query("companies").collect();
    const deletePromises = companies.map(company => ctx.db.delete(company._id));
    await Promise.all(deletePromises);
    return { deleted: companies.length };
  },
});

export const createBulk = mutation({
  args: {
    companies: v.array(v.object({
      companyName: v.string(),
      industry: v.string(),
      subscriptionTier: v.union(v.literal("Free"), v.literal("Starter"), v.literal("Professional")),
      logoUrl: v.optional(v.string()),
      description: v.optional(v.string()),
      website: v.optional(v.string()),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      address: v.optional(v.string()),
    }))
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const company of args.companies) {
      const result = await ctx.db.insert("companies", {
        ...company,
        searchText: `${company.companyName} ${company.industry} ${company.description} ${company.website} ${company.email} ${company.phone} ${company.address}`,
      });
      results.push(result);
    }
    return results;
  },
});

export const get = query({
  args: { id: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getIndustries = query({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.db.query("companies").collect();
    const industries = [...new Set(companies.map(company => company.industry))];
    return industries.sort();
  },
});

export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.db.query("companies").collect();
    return companies.length;
  },
}); 
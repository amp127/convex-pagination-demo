// import { faker } from '@faker-js/faker';
// import { internalMutation } from "./_generated/server";
import { query } from "./_generated/server";
import { paginationOptsValidator } from 'convex/server';


export const getUsers = query({
  args: {paginationOpts: paginationOptsValidator},
  handler: async (ctx,args) => {
    return await ctx.db.query("users").order("desc").paginate(args.paginationOpts);
  }
})

// export const createFake = internalMutation(async (ctx) => {
//   // Initialize Faker with a random value
//   faker.seed();

//   for (let i = 0; i < 200; i++) {
//     await ctx.db.insert("users", {
//       name: faker.person.fullName(),
//       company: faker.company.name(),
//       avatar: faker.image.avatar(),
//     });
//   }
// });
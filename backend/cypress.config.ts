import {defineConfig} from "cypress";
import {createFriendUser, getExistPost, getExistUser, seed} from "./seed.test";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8082",
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        async seedDataBase() {
          await seed();
          return null;
        },
        async getOneUser() {
          const existUser: object[] = await getExistUser();
          if (existUser && existUser.length > 0) {
            return existUser[0];
          }
          return null;
        },
        async createFriend() {
          return createFriendUser();
        },
        async getFirstPost() {
          const firstPost = await getExistPost();
          if (firstPost && firstPost.length > 0) {
            return firstPost[0];
          }
          return null;
        }

      })
    },
  },
});

import { ILoggedInUserInfo, IPostInfo } from "../models/GlobalTypes";
import userData from "../fixtures/user-data.json";
import postData from "../fixtures/post-data.json";

describe("Post tess suite", () => {
  beforeEach(() => {
    cy.task("seedDataBase");
    cy.login(userData.validLogin.email, userData.validLogin.password);
  });
  context("create post", () => {
    it("should return error with invalid token", function () {
      cy.testInvalidToken({ method: "POST", url: "/api/post" });
    });
    it("should return error with invalid data", function () {
      cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
        cy.api({
          method: "POST",
          url: "/api/post",
          body: postData.invalidData,
          failOnStatusCode: false,
          headers: {
            Authorization: userInfo.token
          }
        }).then((resp) => {
          expect(resp.status).to.be.eq(400);
          expect(resp.body.error).to.not.undefined;
        });

        cy.api({
          method: "POST",
          url: "/api/post",
          body: postData.invalidUserId,
          failOnStatusCode: false,
          headers: {
            Authorization: userInfo.token
          }
        }).then((resp) => {
          expect(resp.status).to.be.eq(400);
          expect(resp.body.error).to.not.undefined;
        });
      });
    });

    it("should create a post with correct info", () => {
      cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
        cy.api({
          method: "POST",
          url: "/api/post",
          body: { ...postData.precise, userId: userInfo.user._id },
          failOnStatusCode: false,
          headers: {
            Authorization: userInfo.token
          }
        }).then((resp) => {
          expect(resp.status).to.be.eq(200);
          expect(resp.body._id).to.not.undefined;
        });
      });
    });
  });
  context("read posts", () => {
    it("should return error with invalid token", function () {
      cy.testInvalidToken({ method: "GET", url: "/api/post" });
    });
    it("should return all created post", function () {
      cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
        cy.api({
          method: "GET",
          url: "/api/post",
          body: {},
          failOnStatusCode: false,
          headers: {
            Authorization: userInfo.token
          }
        }).then((resp) => {
          expect(resp.status).to.be.eq(200);
          expect(resp.body.length).to.be.eq(1);
        });
      });
    });
  });
  context("user posts", () => {
    it("should return error with invalid token", function () {
      cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
        cy.testInvalidToken({ method: "GET", url: `/api/user/${userInfo.user._id}/posts` });
      });
    });
    it("should return error with invalid user id", function () {
      cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
        cy.api({
          method: "GET",
          url: "/api/user/dummyId/posts",
          body: {},
          failOnStatusCode: false,
          headers: {
            Authorization: userInfo.token
          }
        }).then((resp) => {
          expect(resp.status).to.be.eq(400);
          expect(resp.body.error).to.not.undefined;
        });
      });
    });
    it("should return user posts by user id", function () {
      cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
        cy.api({
          method: "GET",
          url: `/api/user/${userInfo.user._id}/posts`,
          body: {},
          failOnStatusCode: false,
          headers: {
            Authorization: userInfo.token
          }
        }).then((resp) => {
          expect(resp.status).to.be.eq(200);
          expect(resp.body.length).to.be.eq(1);
        });
      });
    });
  });
  context("update post", () => {
    beforeEach(() => {
      cy.task("getFirstPost").then((resp) => {
        cy.wrap(resp).as("postInfo");
      });
    });
    it("should return error with invalid token", function () {
      cy.get("@postInfo").then((postInfo: IPostInfo) => {
        cy.testInvalidToken({ method: "POST", url: `/api/post/${postInfo._id}` });
      });
    });
    it("should add and remove a like to the post", function () {
      cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
        cy.get("@postInfo").then((postInfo: IPostInfo) => {
          cy.api({
            method: "POST",
            url: `/api/post/${postInfo._id}`,
            body: { userId: userInfo.user._id },
            failOnStatusCode: false,
            headers: {
              Authorization: userInfo.token
            }
          }).then((resp) => {
            expect(resp.status).to.be.eq(200);
            expect(resp.body.likes[userInfo.user._id]).to.be.eq(true);
          });
        });

        cy.get("@postInfo").then((postInfo: IPostInfo) => {
          cy.api({
            method: "POST",
            url: `/api/post/${postInfo._id}`,
            body: { userId: userInfo.user._id },
            failOnStatusCode: false,
            headers: {
              Authorization: userInfo.token
            }
          }).then((resp) => {
            expect(resp.status).to.be.eq(200);
            expect(resp.body.likes[userInfo.user._id]).to.be.undefined;
          });
        });
      });
    });
  });
});

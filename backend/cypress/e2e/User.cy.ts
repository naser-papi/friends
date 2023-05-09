import userData from "../fixtures/user-data.json";
import {IDocInfo, ILoggedInUserInfo} from "../models/GlobalTypes";

describe("User api tests suite", () => {
    beforeEach(() => {
        cy.task("seedDataBase");
        cy.login(userData.validLogin.email, userData.validLogin.password);
    })
    context("UserInfo", () => {
        it('should return 403 error with invalid token', function () {
            cy.testInvalidToken({url: `/api/user/dummyId`, method: "GET"});
        });

        it('should return user with valid token', function () {
            cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
                cy.api({
                    method: "GET",
                    failOnStatusCode: false,
                    headers: {
                        Authorization: userInfo.token,
                    },
                    url: `/api/user/${userInfo.user._id}`,
                }).then(resp => {
                    expect(resp.status).to.be.eq(200);
                    expect(resp.body.email).to.be.eq(userInfo.user.email);
                })
            })
        });

        it('should return error wirh invalid userId', function () {
            cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
                cy.api({
                    method: "GET",
                    failOnStatusCode: false,
                    headers: {
                        Authorization: userInfo.token,
                    },
                    url: `/api/user/dummyId`,
                }).then(resp => {
                    expect(resp.status).to.be.eq(400);
                    expect(resp.body.error).to.not.undefined;
                })
            })
        });
    })

    context("User Friends", () => {
        it('should return error with invalid token', function () {
            cy.testInvalidToken({url: `/api/user/dummyId/friends`, method: "GET"});
        });
        it('should return error with invalid user id', function () {
            cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
                cy.api({
                    method: "GET",
                    url: `/api/user/dummyId/friends`,
                    failOnStatusCode: false,
                    headers: {
                        Authorization: userInfo.token,
                    },
                }).then(resp => {
                    expect(resp.status).to.be.eq(400);
                    expect(resp.body.error).to.not.undefined;
                })
            })
        });

        it('should return user with friends info', function () {
            cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
                cy.api({
                    method: "GET",
                    url: `/api/user/${userInfo.user._id}/friends`,
                    failOnStatusCode: false,
                    headers: {
                        Authorization: userInfo.token,
                    },
                }).then(resp => {
                    expect(resp.status).to.be.eq(200);
                    expect(resp.body.length).to.be.eq(2);
                })
            })
        });

        it('should remove a friend from user', function () {
            cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
                const {_id, friends} = userInfo.user;
                cy.api({
                    method: "PATCH",
                    url: `/api/user/${_id}/${friends[0]}`,
                    failOnStatusCode: false,
                    headers: {
                        Authorization: userInfo.token,
                    },
                }).then(resp => {
                    expect(resp.status).to.be.eq(200);
                    expect(resp.body.length).to.be.eq(1);
                })
            })
        });
        it.only('should add new friend to user', function () {
            cy.task("createFriend").then((friend: IDocInfo) => {
                cy.get("@userInfo").then((userInfo: ILoggedInUserInfo) => {
                    const {_id} = userInfo.user;
                    cy.api({
                        method: "PATCH",
                        url: `/api/user/${_id}/${friend._id}`,
                        failOnStatusCode: false,
                        headers: {
                            Authorization: userInfo.token,
                        },
                    }).then(resp => {
                        expect(resp.status).to.be.eq(200);
                        expect(resp.body.length).to.be.eq(3);
                    })
                })
            })
        });
    })
})
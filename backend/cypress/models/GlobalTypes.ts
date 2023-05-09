export interface IDocInfo extends JQuery {
  _id: string;
}

export interface ILoggedInUserInfo extends JQuery {
  user: {
    _id: string;
    email: string;
    password: string;
    friends: string[];
  };
  token: string;
}

export interface IPostInfo extends IDocInfo {
  userId: string;
  likes: string;
}

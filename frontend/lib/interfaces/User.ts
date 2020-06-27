interface User {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
  googleId: string;
  email: string;
  roles: [string];
}

export default User;
import { PrivateUser } from "../modules/user/schema";

export type Env = {
  Variables: {
    user: PrivateUser;
  };
};

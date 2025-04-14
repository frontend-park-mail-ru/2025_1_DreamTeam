export type UpdateData = {
  name: string;
  email: string;
  bio: string;
  hide_email: boolean;
  avatar_src: string;
};

export type UserProfile =
  | {
      name: string;
      email: string;
      bio: string;
      avatar_src: string;
      hide_email: boolean;
    }
  | false;

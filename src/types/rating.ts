export interface User {
  name: string;
  avatar_src: string;
}

export interface RatingItem {
  user: User;
  rating: number;
}

export type RatingList = RatingItem[];

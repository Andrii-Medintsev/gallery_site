interface Tag {
  type: string;
  title: string;
  source?: {
    title: string;
  }
}

export type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  user: {
    username: string;
    name: string;
    first_name: string;
    profile_image: {
      small: string;
    }
    portfolio_url: string;
  };
  likes: number;
  description: string;
  views: number;
  downloads: number;
  tags: Tag[];
};
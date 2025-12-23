export interface FacebookCategory {
  id: string;
  name: string;
}

export interface FacebookPageInfo {
  about: string;
  name: string;
  picture: {
    data: {
      url: string;
      cache_key: string;
      is_silhouette: boolean;
      height: number;
      width: number;
    };
  };
  id: string;
  followers_count: number;
  category_list: FacebookCategory[];
}

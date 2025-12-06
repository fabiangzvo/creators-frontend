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
}

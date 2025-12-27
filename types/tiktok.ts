export interface TiktokAccountInfo {
  user: {
    open_id: string;
    union_id: string;
    display_name: string;
    username: string;
    avatar_url: string;
    bio_description: string;
    profile_deep_link: string;
    is_verified: boolean;
    follower_count: number;
    following_count: number;
    likes_count: number;
    video_count: number;
  };
}

export interface YouTubeChannelInfo {
  kind: string;
  etag: string;
  items: YouTubeChannel[];
}

export interface YouTubeChannel {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    customUrl?: string;
    publishedAt: string;
    country?: string;
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
  topicDetails?: {
    topicIds?: string[];
    topicCategories?: string[];
  };
}

export interface YouTubeThumbnails {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

export interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

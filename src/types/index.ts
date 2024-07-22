import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  BottomTabStack: NavigatorScreenParams<BottomTabParamList>;
  ChannelDetail: {channelId: string; title: string};
};

export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  VideoDetail: {videoId: string; channelId: string};
};

export type CategoryType = {
  id: string;
  snippet: {
    title: string;
    assignable: boolean;
  };
};

export type VideoType = {
  id: string;
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key in 'default' | 'medium' | 'high' | 'standard' | 'maxres']: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    contentRating: {};
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
};

export type ChannelType = {
  kind: 'youtube#channel';
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    thumbnails: {
      [key in 'default' | 'medium' | 'high']: {
        url: string;
        width: number;
        height: number;
      };
    };
    localized: {
      title: string;
      description: string;
    };
    country: string;
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
};

export type CommentSnippet = {
  channelId: string;
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: {
    value: string;
  };
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: Date;
  updatedAt: Date;
};

export type CommentThread = {
  kind: 'youtube#commentThread';
  id: string;
  snippet: {
    channelId: string;
    videoId: string;
    topLevelComment: {
      kind: 'youtube#comment';
      id: string;
      snippet: CommentSnippet;
    };
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
  replies: {
    comments?: {
      kind: 'youtube#comment';
      id: string;
      snippet: CommentSnippet;
    }[];
  };
};

export type VideoSearchType = {
  kind: 'youtube#searchResult';
  etag: string;
  id: {
    kind: 'youtube#video';
    videoId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key in 'default' | 'medium' | 'high']: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: Date;
  };
};

export type PlayListType = {
  kind: 'youtube#playlist';
  etag: string;
  id: string;
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key in 'default' | 'medium' | 'high' | 'standard' | 'maxres']: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    localized: {
      title: string;
      description: string;
    };
  };
  contentDetails: {
    itemCount: number;
  };
};

//////////////////
// Common types
interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    [key in 'default' | 'medium' | 'high']: Thumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: Date;
}

interface Id {
  kind: string;
  videoId?: string;
  playlistId?: string;
  channelId?: string;
}

// Type for channel
export interface CommonData {
  kind: 'youtube#searchResult';
  etag: string;
  id: Id;
  snippet: Snippet;
}

export interface ChannelData extends CommonData {
  id: {
    kind: 'youtube#channel';
    channelId: string;
  };
}

export interface VideoData extends CommonData {
  id: {
    kind: 'youtube#video';
    videoId: string;
  };
}

// Type for playlist
export interface PlaylistData extends CommonData {
  id: {
    kind: 'youtube#playlist';
    playlistId: string;
  };
}

// Union type
export type SearchYouTubeData = ChannelData | VideoData | PlaylistData;

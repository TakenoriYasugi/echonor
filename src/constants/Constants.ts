export enum ButtonNavigationLabel {
    Home = 'home',
    Favorite = 'favorite',
    Search = 'search',
    Notifications = 'notifications'
}

export enum ReactionType {
    Heart = 'heart',
    Good = 'good',
    Smile = 'smile',
    Sad = 'sad',
    Surprise = 'surprise',
    Bad = 'bad',
    Bookmark = 'bookmark'
}

export enum ReactionColor {
    Heart = "#ff1744",
    Good = "#ffc107",
    Smile = "#ff9800",
    Sad = "#ff9800",
    Bad = "blue",
    Default = "gray",
    Bookmark = "orange"
}

export type ReactionCounts = {
    heart: number,
    good: number,
    smile: number,
    sad: number,
    bad: number,
    bookmark: number
  }


export const MAX_POST_LENGTH = 140;
export const MAX_TOPIC_TITLE_LENGTH = 30;


// 一度に取得する投稿数
export const MAX_POST_COUNT = 100;

export type ReactionStates = {
    postId: string,
    states: IsReactionedStates
}

export type IsReactionedStates = {
    good: boolean,
    heart: boolean,
    smile: boolean,
    sad: boolean,
    bad: boolean,
    bookmark: boolean
}


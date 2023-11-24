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
    Bad = 'bad'
}

export enum ReactionColor {
    Heart = "#ff1744",
    Good = "#ffc107",
    Smile = "#ff9800",
    Sad = "#ff9800",
    Surprise = "red",
    Bad = "blue",
    Default = "gray",
}

export type ReactionCounts = {
    heart: number,
    good: number,
    smile: number,
    sad: number,
    surprise: number,
    bad: number
  }


export const MAX_POST_LENGTH = 140;

// 一度に取得する投稿数
export const MAX_POST_COUNT = 100;
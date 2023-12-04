export type PostType = {
    postId: string,
    userId: string,
    content: string,
    reactionCounts: ReactionCounts,
    id: string,
    createdAt: string,
    updatedAt: string,
}

export type ReactionCounts = {
    good: number,
    heart: number,
    smile: number,
    sad: number,
    bad: number,
    bookmark: number
}
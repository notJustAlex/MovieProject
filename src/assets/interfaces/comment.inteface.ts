export interface ICommentData {
	etag: string;
	items: IComment[];
	kind: "youtube#commentThreadListResponse";
	nextPageToken: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
}

export interface IComment {
	kind: "youtube#commentThread";
	etag: string;
	id: string;
	snippet: {
		channelId: string;
		videoId: string;
		topLevelComment: {
			kind: "youtube#comment";
			etag: string;
			id: string;
			snippet: {
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
				canRate: true;
				viewerRating: string;
				likeCount: 0;
				publishedAt: Date;
				updatedAt: Date;
			};
		};
		canReply: boolean;
		totalReplyCount: number;
		isPublic: boolean;
	};
}

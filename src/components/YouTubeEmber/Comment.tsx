import { useState } from "react";
import { ReactComponent as AccountIcon } from "../../assets/icons/account.svg";

const Comment = ({ comment }: any) => {
	const [imageError, setImageError] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const formatTimeAgo = (publishedAt: string, updatedAt: string) => {
		const ONE_MINUTE = 60;
		const ONE_HOUR = 60 * ONE_MINUTE;
		const ONE_DAY = 24 * ONE_HOUR;
		const ONE_MONTH = 30 * ONE_DAY;
		const ONE_YEAR = 365 * ONE_DAY;

		const currentDate: Date = new Date();
		const parseDate = (dateString: string): Date => new Date(dateString);
		const timeDiff = (date: Date) =>
			Math.floor((currentDate.getTime() - date.getTime()) / 1000);

		const formatTimeDifference = (timeDiff: number) =>
			timeDiff < ONE_MINUTE
				? "just now"
				: timeDiff < ONE_HOUR
				? `${Math.floor(timeDiff / ONE_MINUTE)} ${
						timeDiff < 120 ? "minute" : "minutes"
				  } ago`
				: timeDiff < ONE_DAY
				? `${Math.floor(timeDiff / ONE_HOUR)} ${
						timeDiff < ONE_HOUR * 2 ? "hour" : "hours"
				  } ago`
				: timeDiff < ONE_MONTH
				? `${Math.floor(timeDiff / ONE_DAY)} ${
						timeDiff < ONE_DAY * 2 ? "day" : "days"
				  } ago`
				: timeDiff < ONE_YEAR
				? `${Math.floor(timeDiff / ONE_MONTH)} ${
						timeDiff < ONE_MONTH * 2 ? "month" : "months"
				  } ago`
				: `${Math.floor(timeDiff / ONE_YEAR)} ${
						timeDiff < ONE_YEAR * 2 ? "year" : "years"
				  } ago`;

		return publishedAt === updatedAt
			? formatTimeDifference(timeDiff(parseDate(publishedAt)))
			: `${formatTimeDifference(timeDiff(parseDate(publishedAt)))} (edited)`;
	};

	return (
		<li className="comment">
			<div className="icon_wrapper">
				{!imageError ? (
					<img
						src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
						alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
						onError={() => {
							setImageError(true);
						}}
					/>
				) : (
					<AccountIcon />
				)}
			</div>
			<div className="text_wrapper">
				<div className="top_wrapper">
					<span className="name">
						{comment.snippet.topLevelComment.snippet.authorDisplayName}
					</span>
					<span className="date">
						{formatTimeAgo(
							comment.snippet.topLevelComment.snippet.publishedAt,
							comment.snippet.topLevelComment.snippet.updatedAt
						)}
					</span>
				</div>

				<span className="text">
					<p
						style={{ margin: 0, display: "inline" }}
						dangerouslySetInnerHTML={{
							__html: isExpanded
								? comment.snippet.topLevelComment.snippet.textDisplay
								: comment.snippet.topLevelComment.snippet.textDisplay.slice(
										0,
										200
								  ) +
								  (comment.snippet.topLevelComment.snippet.textDisplay.length >
								  200
										? "..."
										: ""),
						}}
					/>

					{comment.snippet.topLevelComment.snippet.textDisplay.length > 200 && (
						<span onClick={() => setIsExpanded(!isExpanded)}>
							{isExpanded ? (
								<span className="expanded">Hide</span>
							) : (
								<span className="expanded">More...</span>
							)}
						</span>
					)}
				</span>
			</div>
		</li>
	);
};

export default Comment;

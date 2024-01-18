import { useEffect, useRef, useState } from "react";
import MovieService from "../../service/MovieService";
import Comment from "./Comment";

import {
	IComment,
	ICommentData,
} from "../../assets/interfaces/comment.inteface";

import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as AccountIcon } from "../../assets/icons/account.svg";
import { useTranslation } from "react-i18next";

interface IProps {
	videoId: string;
}

const CommentsSection = ({ videoId }: IProps) => {
	const { getMoviesCommentsByID, setProcess, clearError } = MovieService();

	const { t } = useTranslation();

	const [comments, setComments] = useState<IComment[]>([]);
	const [visibleItems, setVisibleItems] = useState(10);

	const [nextPageToken, setNextPageToken] = useState("");

	const isCalledRef = useRef(false);

	useEffect(() => {
		if (!isCalledRef.current) {
			isCalledRef.current = true;
			getComments(videoId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getComments = (id: string, pageToken: string = "") => {
		clearError();
		getMoviesCommentsByID(id, pageToken)
			.then((newComments: ICommentData) => {
				setComments((prevComments: IComment[]) => [
					...prevComments,
					...newComments.items,
				]);
				setNextPageToken(newComments.nextPageToken);
			})
			.then(() => setProcess("confirmed"));
	};

	if (!comments) return <p>Loading...</p>;

	return (
		<section className="comments">
			<h3 className="title">
				<CommentIcon /> {t("single_movie_title_comments")}
			</h3>

			<div className="comments_wrapper">
				<div className="input_comment_wrapper">
					<div className="avatar">
						<AccountIcon />
					</div>
					<input type="text" placeholder="Express an opinion" />
				</div>

				<ul className="comments_list">
					{comments?.slice(0, visibleItems).map((comment: IComment) => (
						<Comment comment={comment} key={comment.id} />
					))}
				</ul>

				<div className="button_wrapper">
					<button
						onClick={() => {
							setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
							if (visibleItems < comments?.length)
								getComments(videoId, nextPageToken);
						}}
					>
						Load More
					</button>
				</div>
			</div>
		</section>
	);
};

export default CommentsSection;

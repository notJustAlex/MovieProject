interface IProps {
	videoId: string;
}

const YouTubeEmbed = ({ videoId }: IProps) => {
	return (
		<div className="video-container" style={{ height: "100%", width: "100%" }}>
			<iframe
				width="100%"
				height="100%"
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	);
};

export default YouTubeEmbed;

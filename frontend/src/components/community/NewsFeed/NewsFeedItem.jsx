// src/components/NewsFeed/NewsFeedItem.js
import { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import ProfileHeader from "./ProfileHeader";
import moment from "moment";
import NewsFeedStats from "./NewsFeedStats";
import { fetchPostStats } from "../../../api/postApi";
import { getRandomAvatar } from "../../../utils/tools";
import ActionButtons from "./ActionButtons";

function NewsFeedItem({
  authorImage,
  authorName,
  postId,
  postTitle,
  postContent,
  postImages,
  postCreatedTime,
  initialNumberOfLikes,
  initialNumberOfComments,
}) {
  const [numberOfLikes, setNumberOfLikes] = useState(initialNumberOfLikes);
  const [numberOfComments, setNumberOfComments] = useState(
    initialNumberOfComments
  );
  const formattedTime = moment(postCreatedTime).fromNow();
  const avatar = authorImage || getRandomAvatar(authorName);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const stats = await fetchPostStats(postId);
        setNumberOfLikes(stats.numberOfLikes);
        setNumberOfComments(stats.numberOfComments);
      } catch (error) {
        console.error("Error fetching post stats:", error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [postId]);

  return (
    <div className="news-feed-item tw-w-full tw-border tw-border-slate-300 tw-p-10 tw-rounded-2xl tw-text-[17px]">
      <ProfileHeader
        img={avatar}
        name={authorName}
        title={""}
        time={formattedTime}
      />
      <div className="news-feed-item-content">
        <h2 className="content-title tw-font-bold tw-mb-4">{postTitle}</h2>
        {postContent}
      </div>
      <div className="news-feed-item-gallery">
        <ImageGallery images={postImages} />
      </div>

      <NewsFeedStats
        numberOfLikes={numberOfLikes}
        numberOfComments={numberOfComments}
      />

      <hr className="tw-my-4 tw-border-slate-500" />

      <ActionButtons />
    </div>
  );
}

export default NewsFeedItem;

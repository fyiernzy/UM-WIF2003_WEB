import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsFeedItem from "../../components/community/NewsFeed/NewsFeedItem";
import { getPostById } from "../../api/postApi";
import { PostProvider } from "../../context/PostContext";

function SinglePostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(postId);

        setPost(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post Not Found</div>;
  }

  return (
    <div className="tw-px-12">
      {post ? (
        <PostProvider postId={post._id} post={post}>
          <NewsFeedItem
            authorImage={post.author?.profilePic || null}
            authorName={post.author?.username || "Unknown"}
            postId={post._id}
            postTitle={post.title}
            postContent={post.content}
            postImages={post.images || []}
            postCreatedTime={post.createdAt}
            numberOfLikes={post.likes.length}
            numberOfComments={post.comments.length}
          />
        </PostProvider>
      ) : (
        <div>404 Not Found</div>
      )}
    </div>
  );
}

export default SinglePostPage;

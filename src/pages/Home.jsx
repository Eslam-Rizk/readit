import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import CheckLoggedInUser from "../utils/LoggedInUser";
import ArrayFromNum from "../utils/ArrayFromNum";
import PostSkeleton from "../components/PostSkeleton";
import AsideUserSkeleton from "../components/AsideUserSkeleton";
import AsideRecommendedSkeleton from "../components/AsideRecomendedSkeleton";
import { Link } from "react-router";
import ThemeButton from "../components/ThemeButton";
import AddPost from "../components/AddPost";
import { useUser } from "../contexts/userContext";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Home() {
  const { user } = useUser();
  const [postsLoading, setPostsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [comments, setComments] = useState([]);
  const [media, setMedia] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const skeletons = ArrayFromNum(5);

  function getUserPosts(posts) {
    const user_posts = posts.filter((p) => p.userId === user.id);
    setUserPosts(user_posts);
  }

  useEffect(() => {
    async function getPosts() {
      try {
        // Add artificial delay before making the request
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const res = await axios.get(`${apiUrl}/posts`);
        // Sort posts from newest to oldest by createdAt
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
        setPostsLoading(false);
        if (user) getUserPosts(sortedPosts);
      } catch (error) {
        console.error("error fetching posts");
      }
    }
    async function getFollowings(id) {
      try {
        const res = await axios.get(`${apiUrl}/followings?userId=${id}`);
        console.log("following:", res.data);
        setFollowing(res.data);
      } catch (error) {
        console.error("error fetching followings", error);
      }
    }
    async function getFollowers(id) {
      try {
        const res = await axios.get(`${apiUrl}/followings?followingId=${id}`);
        console.log("followers:", res.data);
        setFollowers(res.data);
      } catch (error) {
        console.error("error fetching followers", error);
      }
    }
    async function getComments(id) {
      try {
        const res = await axios.get(`${apiUrl}/comments?userId=${id}`);
        console.log("comments:", res.data);
        setComments(res.data);
      } catch (error) {
        console.error("error fetching comments", error);
      }
    }
    async function getMedia(id) {
      try {
        const res = await axios.get(`${apiUrl}/images?userId=${id}`);
        console.log("media for user:",user, res.data);
        setMedia(res.data);
      } catch (error) {
        console.error("error fetching media", error);
      }
    }
    getPosts();
    if (user) {
      getFollowings(user.id);
      getFollowers(user.id);
      getComments(user.id);
      getMedia(user.id);
    }
  }, []);

  useEffect(() => {
    console.log("posts changed", posts);
  }, [posts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10 gap-4 px-2 md:px-6">
      {/* User Sidebar */}
      <div className="hidden md:flex flex-col items-center p-2 col-span-2 sticky top-21 h-dvh m-0 md:m-5 rounded-lg shadow-sm bg-base-100">
        {user &&
          (postsLoading ? (
            <AsideUserSkeleton />
          ) : (
            <>
              <div className="avatar avatar-online">
                <div className="w-24 rounded-full">
                  <Link to={`/profile/${user.id}`}>
                    <img
                      src={user.avatar}
                      alt="profile-image"
                      className="h-24 w-24 md:h-40 md:w-40 rounded-full object-cover"
                    />
                  </Link>
                </div>
              </div>
              <Link to={`/profile/${user.id}`}>
                <h1 className="font-bold text-primary md:text-lg mt-2 text-center">
                  {user.name}
                </h1>
              </Link>
              {/* Stats */}
              <div className="w-auto mt-4 flex flex-col">
                <div className="flex flex-row justify-between gap-2">
                  <div className="flex flex-col items-center flex-1 stat p-0">
                    <div className="stat-title">Followers</div>
                    <div className="stat-value text-sm">{followers.length}</div>
                  </div>
                  <div className="flex flex-col items-center flex-1 stat p-0">
                    <div className="stat-title">Following</div>
                    <div className="stat-value text-sm">{following.length}</div>
                  </div>
                </div>
                <div className=" stats stats-vertical mt-4 w-full">
                  <div className="flex flex-row justify-between items-center flex-1 stat">
                    <div className="stat-title">Posts</div>
                    <div className="stat-value text-sm">{userPosts.length}</div>
                  </div>
                  <div className="flex flex-row justify-between items-center flex-1 stat">
                    <div className="stat-title">Comments</div>
                    <div className="stat-value text-sm">{comments.length}</div>
                  </div>
                  <div className="flex flex-row justify-between items-center flex-1 stat">
                    <div className="stat-title">Media</div>
                    <div className="stat-value text-sm">{media.length}</div>
                  </div>
                  <div className="flex flex-row justify-between items-center flex-1 stat">
                    <div className="stat-title">Theme</div>
                    <div className="stat-value text-sm">
                      <ThemeButton />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
      {/* Main Content */}
      <div className="flex flex-col items-center col-span-1 md:col-span-4 lg:col-span-6 w-full max-w-2xl mx-auto">
        <AddPost type={"posts"} user={user} setData={setPosts} />
        {postsLoading
          ? skeletons.map((skeleton) => <PostSkeleton key={skeleton} />)
          : posts.map((post) => (
              <div key={post.id} className="w-full mb-4">
                <PostCard user={user} post={post} posts={posts} setPosts={setPosts} />
              </div>
            ))}
      </div>
      {/* Recommended section */}
      <div className="hidden lg:flex flex-col items-center p-2 col-span-2 sticky top-21 h-dvh m-0 md:m-5 rounded-lg shadow-sm">
        {user && (
          <>
            <h1 className="text-xl font-bold mb-4">You May Also Like</h1>
            {postsLoading ? (
              <AsideRecommendedSkeleton />
            ) : (
              <p className="flex flex-col items-center justify-center h-[30%]">
                Nothing To Show Now
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

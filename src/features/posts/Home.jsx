import NewPost from "../../components/NewPost";
import Feed from "./Feed";

export default function Home() {
  return (
    <div className="py-4">
      <NewPost parent_post={null} placeholder="What's happening?" />
      <Feed />
    </div>
  );
}

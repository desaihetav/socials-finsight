import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewPost from "../../components/NewPost";
import Feed from "./Feed";

export default function Home() {
  return (
    <div className="py-4">
      <NewPost />
      <Feed />
    </div>
  );
}

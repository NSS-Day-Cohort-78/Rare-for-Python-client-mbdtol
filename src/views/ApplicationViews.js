import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MyPosts } from "../components/myposts/MyPosts"
import { EditPostForm } from "../components/myposts/EditPost"
import { PostDetails } from "../components/myposts/PostDetails"
import { AllPosts } from "../components/myposts/AllPosts"
import { NewPost } from "../components/myposts/NewPost"
import { DeletePostConfirm } from "../components/myposts/DeletePost"
import { AuthorProfile } from "../users/AuthorProfile"
import { PostsByUserProfile } from "../components/myposts/PostsByUserProfile"

export const ApplicationViews = ({ token, setToken }) => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route path="/register" element={<Register setToken={setToken} />} />
				<Route element={<Authorized token={token} />}>
					{/* Add Routes here */}
					<Route path="/myposts" element={<MyPosts token={token} />} />
					<Route path="/allposts" element={<AllPosts token={token} />} />
					<Route path="/newpost" element={<NewPost token={token} />} />
					<Route path="/post/:postId" element={<PostDetails token={token} />} />
					<Route path="/profile/:userId" element={<AuthorProfile />} />
					<Route path="/postsbyuser/:userId" element={<PostsByUserProfile />} />
					<Route
						path="/edit-post/:postId"
						element={<EditPostForm token={token} />}
					/>
					<Route
						path="/delete-post/:postId"
						element={<DeletePostConfirm token={token} />}
					/>
				</Route>
			</Routes>
		</>
	)
}

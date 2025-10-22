import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MyPosts } from "../components/myposts/MyPosts"
import { AllPosts } from "../components/myposts/AllPosts"

export const ApplicationViews = ({ token, setToken }) => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route path="/register" element={<Register setToken={setToken} />} />
				<Route element={<Authorized token={token} />}>
					{/* Add Routes here */}
					{<Route path="/myposts" element={<MyPosts token={token} />} />}
					{<Route path="/allposts" element={<AllPosts token={token} />} />}
				</Route>
			</Routes>
		</>
	)
}

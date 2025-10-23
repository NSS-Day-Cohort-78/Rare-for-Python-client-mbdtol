import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FetchUserById } from "../managers/UsersManager";

export const AuthorProfile = () => {
    const { userId } = useParams();
    const [author, setAuthor] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        FetchUserById(userId).then((userData) => {
            setAuthor(userData);
        })
    }, [userId])


    return (
        <>
        <div className="box">
            {author.profile_image_url && (
                <img src={author.profile_image_url} alt={author.username} />
            )}
            <h1 className="title is-4">{author.first_name} {author.last_name}</h1>
            <h2>{author.username}</h2>
            <p>{author.bio}</p>
            <p>{author.first_name} has written {author.post_count} post(s).</p>
        </div>
    </>
    )
}
import { useHistory } from "react-router-dom";
import { Container, FlexColumn, FlexRow } from "../styles/generalStyles";
import { Post } from "../components/Post/Post";
import axios from "axios";
import { ROOT_URL } from "../api/auth/actions";
import { useEffect, useState } from "react";
import EditProfileWindow from "../components/ModalWindow/EditProfileWindow";
import { AppButton } from "../components/AppButton/AppButton";
import { AppIcons, AppColors } from "../styles/variables";

export const Profile = () => {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  let [articles, setArticles] = useState([]);

  const handleCloseModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const getProfileData = async () => {
      const articleData = await axios.get(
        `${ROOT_URL}/articles${history.location.search}`
      );

      const userData = await axios.get(
        `${ROOT_URL}${history.location.pathname}${history.location.search}`
      );
      setUser(userData.data.profile);
      setArticles(articleData.data.articles);
    };
    getProfileData();
  }, []);

  const followUser = async () => {
    const res = await axios.post(
      `${ROOT_URL}/profiles/${user.username}/follow`,
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    setUser(res.data.profile);
  };

  const unfollowUser = async () => {
    const res = await axios.delete(
      `${ROOT_URL}/profiles/${user.username}/follow`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );

    setUser(res.data.profile);
  };

  return (
    <>
      {user ? (
        <Container>
          <EditProfileWindow
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            initialState={user}
            onSubmit={setUser}
          />
          <section className="user-info">
            <FlexRow>
              <img src={user.image} alt="Avatar" />
              <FlexColumn>
                <p>{user.username}</p>
                <p>{user.createdAt}</p>
                <p>{user.bio}</p>
                {history.location.state.currentUser ? (
                  <AppButton
                    content={AppIcons.edit}
                    color={AppColors.light}
                    handle={handleCloseModal}
                  />
                ) : (
                  <AppButton
                    content={AppIcons.subscription}
                    color={AppColors.light}
                    handle={user.following ? unfollowUser : followUser}
                    isFavorited={user.following}
                  />
                )}
              </FlexColumn>
            </FlexRow>
          </section>
          <section className="my-articles">
            {articles.map((article, index) => (
              <Post key={index + article.title} {...article} />
            ))}
          </section>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { updateUserSchema } from "./components/list/userInfo/updateUserSchema";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const [info, setInfo] = useState(false);
  const [view, setView] = useState(false);

  const handleInfo = () => {
    setInfo(!info);
  };

  const handleBack = () => {
    setView(false);
  };

  const handleChatSelect = () => {
    setView(true);
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    const updateSchema = async () => {
      await updateUserSchema();
    };

    updateSchema();

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List onChatSelect={handleChatSelect} onBack={handleBack}/>
          {view && chatId && <Chat infoprop={handleInfo} onBack={handleBack} />}
          {view && chatId && info && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;

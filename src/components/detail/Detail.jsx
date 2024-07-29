import { useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

import Photos from "./Photos";

const Detail = () => {
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
    showDeleteButtons,
    toggleDeleteButtons, // Add this
  } = useChatStore();
  const { currentUser } = useUserStore();

  const [showPhotos, setShowPhotos] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false); // Add this state

  const handleShowPhotos = () => {
    setShowPhotos(!showPhotos);
  };

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

 const handleDelete = () => {
   toggleDeleteButtons(); // Toggle the delete buttons state
   console.log("Delete button clicked");
 };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>{user.description}</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span onClick={() => setShowDeleteButton(!showDeleteButton)}>
              Chat Settings
            </span>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <div>
              <span onClick={handleShowPhotos}>Shared photos</span>
              {showPhotos && <Photos chatId={chatId} />}
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
          </div>
        </div>
        {showDeleteButton && (
          <button className="delete" onClick={handleDelete}>
            Delete Chat
          </button>
        )}
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;

// import React, { useState } from "react";
// import { auth } from "../../lib/firebase"; // Adjusted import path
// import { useChatStore } from "../../lib/chatStore";
// import { useUserStore } from "../../lib/userStore";
// import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
// import { db } from "../../lib/firebase";
// import Photos from "./Photos";
// import "./detail.css";

// const Detail = ({ onBack }) => {
//   const {
//     chatId,
//     user,
//     isCurrentUserBlocked,
//     isReceiverBlocked,
//     changeBlock,
//     resetChat,
//     showDeleteButtons,
//     toggleDeleteButtons,
//   } = useChatStore();
//   const { currentUser } = useUserStore();

//   const [showPhotos, setShowPhotos] = useState(false);
//   const [showDeleteButton, setShowDeleteButton] = useState(false);

//   const handleShowPhotos = () => {
//     setShowPhotos(!showPhotos);
//   };

//   const handleBlock = async () => {
//     if (!user) return;

//     const userDocRef = doc(db, "users", currentUser.id);

//     try {
//       await updateDoc(userDocRef, {
//         blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
//       });
//       changeBlock();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleLogout = () => {
//     auth.signOut();
//     resetChat();
//   };

//   const handleDelete = () => {
//     toggleDeleteButtons();
//     console.log("Delete button clicked");
//   };

//   return (
//     <div className="detail">
//       <button className="back" onClick={onBack}>
//         Back
//       </button>
//       <div className="user">
//         <img src={user?.avatar || "./avatar.png"} alt="" />
//         <h2>{user?.username}</h2>
//         <p>{user.description}</p>
//       </div>
//       <div className="info">
//         <div className="option">
//           <div className="title">
//             <span onClick={() => setShowDeleteButton(!showDeleteButton)}>
//               Chat Settings
//             </span>
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Privacy & help</span>
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <div>
//               <span onClick={handleShowPhotos}>Shared photos</span>
//               {showPhotos && <Photos chatId={chatId} />}
//             </div>
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Shared Files</span>
//           </div>
//         </div>
//         {showDeleteButton && (
//           <button className="delete" onClick={handleDelete}>
//             Delete Chat
//           </button>
//         )}
//         <button onClick={handleBlock}>
//           {isCurrentUserBlocked
//             ? "You are Blocked!"
//             : isReceiverBlocked
//             ? "User blocked"
//             : "Block User"}
//         </button>
//         <button className="logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Detail;
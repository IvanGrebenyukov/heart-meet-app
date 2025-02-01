import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPage } from "./components/pages/AdminPage.tsx";
import { ChatPage } from "./components/pages/ChatPage.tsx";
import { Chats } from "./components/pages/Chats.tsx";
import { FriendProfile } from "./components/pages/FriendProfile.tsx";
import { Login } from "./components/pages/Login.tsx";
import { Matches } from "./components/pages/Matches.tsx";
import { Notifications } from "./components/pages/Notifications.tsx";
import { Profile } from "./components/pages/Profile.tsx";
import ReportedUserProfile from "./components/pages/ReportedUserProfile.tsx";
import { SignUpFirst } from "./components/pages/SignUpFirst.tsx";
import { SignUpSecond } from "./components/pages/SignUpSecond.tsx";
import { Swipes } from "./components/pages/Swipes.tsx";
import { WelcomeScreen } from "./components/pages/WelcomeScreen.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className={"flex items-center justify-center h-screen bg-lightPink"}>
        <Routes>
          <Route path={"/"} element={<WelcomeScreen />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"signup-first"} element={<SignUpFirst />} />
          <Route path={"signup-second"} element={<SignUpSecond />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"swipes"} element={<Swipes />} />
          <Route path={"chats"} element={<Chats />} />
          <Route
            path={"/current-chat/:targetUserName"}
            element={<ChatPage />}
          />
          <Route path={"matches"} element={<Matches />} />
          <Route path={"notifications"} element={<Notifications />} />
          <Route path="/profile/:userName" element={<FriendProfile />} />
          <Route path="admin-page" element={<AdminPage />} />
          <Route
            path="/admin-page/reportedProfile/:userName"
            element={<ReportedUserProfile />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

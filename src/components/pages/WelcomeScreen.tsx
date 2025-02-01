import { Link } from "react-router-dom";
import { Button } from "../ui/buttons/Button.tsx";

export const WelcomeScreen = () => {
  return (
    <div className={"space-y-4"}>
      <Link to={"signup-first"}>
        <Button className={""}>Регистрация</Button>
      </Link>
      <Link to={"login"}>
        <Button className={"ml-2"}>Вход</Button>
      </Link>
    </div>
  );
};

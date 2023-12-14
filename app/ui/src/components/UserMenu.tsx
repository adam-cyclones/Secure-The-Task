import { useUser } from "../hooks/user";
import { useUiText } from "../hooks/uiText";

function UserMenu() {
  const { user } = useUser();

  const uiText = useUiText();
  return (
    <div style={{ borderRadius: "9e9em" }} className="picture">
      <div className="d-flex align-middle gap-4">
        <p className="font-weight-extra-bold mb-0">
          {user?.username === uiText.reservedAnonymousUserName
            ? uiText.loginPromptText
            : user?.username}
        </p>
        <img
          style={{ maxWidth: "28px", aspectRatio: "2/1" }}
          alt={uiText.defaultImageAltText}
          src={user?.avatar || ""}
        />
      </div>
    </div>
  );
}

export default UserMenu;

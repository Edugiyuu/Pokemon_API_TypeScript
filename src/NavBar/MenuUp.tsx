import { memo } from "react";
import { NavLink } from "react-router-dom";

function MenuUp() {
  const root = document.documentElement;
  root.style.setProperty("backgroundColor", "var(--cor-de-fundo)");

  return (
    <div className="Menu">
      <img
        src="https://cdn-icons-png.flaticon.com/512/287/287221.png"
        style={{ width: "80px" }}
      />

      <NavLink className={"NavLink"} to={`/`}>
        Home
      </NavLink>
      <NavLink className={"NavLink"} to={`/pokemon/types`}>
        Types
      </NavLink>
      <NavLink className={"NavLink"} to={`/pokemon/nature`}>
        Natures
      </NavLink>
    </div>
  );
}

export default memo(MenuUp);

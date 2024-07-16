import { memo } from "react";
import { NavLink } from "react-router-dom";
import TemporaryDrawer from './SideBar'


function MenuUp() {

  return (
    <div className="Menu">
      <img
        src={"https://cdn-icons-png.flaticon.com/512/287/287221.png"}
        style={{ width: "70px" }}
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
      <NavLink className={"NavLink"} to={`/pokemon/stats`}>
        Stats
      </NavLink>
      <NavLink className={"NavLink"} to={`/pokemon/berrys`}>
        Berrys
      </NavLink>
      <TemporaryDrawer></TemporaryDrawer>
    </div>
  );
}

export default memo(MenuUp);

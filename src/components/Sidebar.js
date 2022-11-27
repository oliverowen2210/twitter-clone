import Signup from "./Signup";
import SearchBar from "./SearchBar";

export default function Sidebar(props) {
  return (
    <div className="pl-8 w-[350px]">
      {window.location.pathname === "/explore" ||
      (!props.user && window.location.pathname === "/") ? null : (
        <SearchBar />
      )}
      <Signup />
    </div>
  );
}

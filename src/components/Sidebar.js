import Signup from "./Signup";

export default function Sidebar(props) {
  return (
    <div className="ml-8 w-[350px] hidden lg:block">
      <Signup />
    </div>
  );
}

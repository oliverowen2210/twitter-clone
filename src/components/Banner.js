import Explore from "./Explore";

export default function Sidebar(props) {
  return (
    <div className="flex flex-col items-end grow">
      <div className="w-[275px] h-full px-[12px]">
        <Explore />
      </div>
    </div>
  );
}

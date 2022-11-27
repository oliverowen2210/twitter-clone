import { Link } from "react-router-dom";

export default function Signup(props) {
  return (
    <div className="w-[350px] pt-[12px] pb-[64px] border-[1px] border-solid border-gray-200 rounded-[16px] mb-[16px]">
      <h2 className="text-lg font-bold py-[12px] px-[16px]">New to Twitter?</h2>
      <p className=" text-sm font-heavy text-gray-500 pl-[12px] pr-[12px] text-[13px]">
        Sign up now to get your own personalized timeline!
      </p>
      <div className="my-[16px] mx-[12px]">
        <Link to="/signup">
          <button className="w-[300px] font-bold hover:bg-gray-200 h-[40px] duration-[0.2s] min-w-[36px] min-h-[36px] px-[16px] border-[1px] border-gray-400 rounded-full">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}

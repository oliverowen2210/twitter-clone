export default function Signup(props) {
  return (
    <div className="pt-[12px] pb-[64px] border-[1px] border-solid border-gray-200 rounded-[16px] mb-[16px]">
      <h2 className="text-lg font-bold py-[12px] px-[16px]">New to Twitter?</h2>
      <p className=" text-sm font-heavy text-gray-500 pl-[12px] pr-[12px] text-[13px]">
        Sign up now to get your own personalized timeline!
      </p>
      <div className="my-[16px] mx-[12px]">
        <a href="/signup">
          <button>Sign up</button>
        </a>
      </div>
    </div>
  );
}

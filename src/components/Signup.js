export default function Signup(props) {
  return (
    <div className="p-2 border-[1px] border-solid border-gray-200 rounded-lg">
      <h2 className="text-lg font-bold">New to Twitter?</h2>
      <p className=" text-sm font-heavy text-gray-500">
        Sign up now to get your own personalized timeline!
      </p>
      <a href="/signup">
        <button>Sign up</button>
      </a>
    </div>
  );
}

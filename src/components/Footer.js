export default function Footer(props) {
  return (
    <div className="fixed bg-red-500 bottom-0 w-full">
      <div className="my-[12px] flex justify-center">
        <div className="w-[275px]"></div>

        <div className="flex justify-between w-[990px]">
          <div>
            <h2 className="text-white font-bold text-[23px]">
              Don't miss what's happening*
            </h2>

            <p className="text-white text-[15px]">
              People on Twitter are the first to know?
            </p>
          </div>

          <div className="flex items-center">
            <button
              onClick={props.loginFunc}
              className="hover:bg-red-600 border-solid border-[1px] border-black text-white font-bold px-[16px] py-[8px] rounded-full"
            >
              Log in
            </button>
            <a href="/signup">
              <button className="bg-black hover:bg-gray-800 hover:text-red-600 text-red-500 rounded-full px-[16px] py-[8px] ml-[12px] font-bold">
                Sign up
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

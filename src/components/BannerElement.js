export default function BannerElement(props) {
  return (
    <div>
      <a
        className="flex items-center w-full"
        href={props.link ? props.link : null}
      >
        <div className="flex items-center max-w-full p-[12px]">
          <svg viewBox="0 0 24 24" className="h-[1.75rem]">
            <g>
              <path d={props.path} />
            </g>
          </svg>
          <span className={"ml-[20px] mr-[16px] text-2xl"}>{props.name}</span>
        </div>
      </a>
    </div>
  );
}

export default function BannerElement(props) {
  let bold = "";
  if (props.bold) bold = "font-bold";
  return (
    <div className={props.class ? props.class : null}>
      <a
        className="flex items-center w-full"
        href={props.link ? props.link : null}
      >
        <div className="flex items-center max-w-full p-[12px]">
          <svg
            viewBox="0 0 24 24"
            className={`h-[1.75rem] fill-current text-${
              props.color ? props.color : "black"
            }`}
          >
            <g>
              <path d={props.path} />
            </g>
          </svg>
          <span className={`${bold} ml-[20px] mr-[16px] text-2xl`}>
            {props.name ? props.name : null}
          </span>
        </div>
      </a>
    </div>
  );
}

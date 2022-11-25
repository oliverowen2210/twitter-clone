export default function BannerElement(props) {
  let bold = "";
  if (window.location.pathname === props.link) bold = "font-bold";
  return (
    <div
      className={
        (props.class ? props.class : null) +
        ` flex justify-end xl:justify-start`
      }
    >
      <a className="flex items-center" href={props.link ? props.link : null}>
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
          <span
            className={`${bold} ml-[20px] mr-[16px] text-2xl hidden xl:inline`}
          >
            {props.name ? props.name : null}
          </span>
        </div>
      </a>
    </div>
  );
}

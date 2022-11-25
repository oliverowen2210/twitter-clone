export default function UserInfo(props) {
  return (
    <div className="mt-auto self-end flex rounded-full transition-500 px-4 py-3 hover:bg-gray-300">
      <div className="profilepic rounded-full penguin" />
      <div>
        <h3 className="font-bold">{props.user.username}</h3>
        <p>@{props.user.handle}</p>
      </div>
    </div>
  );
}

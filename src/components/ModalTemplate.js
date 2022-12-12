function modalTemplate() {
  const modal = {
    /**get modal from Layers context */
    show: false,
    toggle: function () {
      return;
    },
  };
  return modal.show ? (
    <div className="bg-gray-800 z-[100] fixed top-0 left-0 w-screen h-screen bg-opacity-30 flex justify-center items-center">
      <div
        className="w-full h-full absolute top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      ></div>
      <div className="flex flex-col items-center bg-white relative rounded-xl h-[650px] w-[600px]"></div>
    </div>
  ) : null;
}

export default function Conversation() {
  return (

<>
  <div id="__next">
    <div className="flex justify-center">
      <div className="flex w-full xl:container h-screen xl:py-4">
      
        <div className="flex w-[70%] bg-[#222E35]">
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full px-4">
              <div className="flex justify-between bg-[#202c33] w-full h-14">
                <div className="flex items-center gap-4 h-full">
                  <div className="rounded-full w-10 h-10">
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "inline-block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: "relative",
                        maxWidth: "100%"
                      }}
                    >
                      <span
                        style={{
                          boxSizing: "border-box",
                          display: "block",
                          width: "initial",
                          height: "initial",
                          background: "none",
                          opacity: 1,
                          border: 0,
                          margin: 0,
                          padding: 0,
                          maxWidth: "100%"
                        }}
                      >
                        <img
                          alt=""
                          aria-hidden="true"
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2796%27%20height=%2796%27/%3e"
                          style={{
                            display: "block",
                            maxWidth: "100%",
                            width: "initial",
                            height: "initial",
                            background: "none",
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0
                          }}
                        />
                      </span>
                      <img
                        alt="Avatar Image"
                        srcSet="/_next/image?url=%2Fassets%2Fimages%2Favatar.jpg&w=96&q=75 1x, /_next/image?url=%2Fassets%2Fimages%2Favatar.jpg&w=256&q=75 2x"
                        src="/_next/image?url=%2Fassets%2Fimages%2Favatar.jpg&w=256&q=75"
                        decoding="async"
                        data-nimg="intrinsic"
                        className="rounded-full"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%"
                        }}
                      />
                    </span>
                  </div>
                  <h1 className="text-white font-normal">Pedro</h1>
                </div>
                <div className="flex items-center text-[#8696a0] gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  >
                    <path
                      fill="currentColor"
                      d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  >
                    <path
                      fill="currentColor"
                      d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col w-full h-full px-24 py-6 overflow-y-auto"
              style={{
                backgroundImage: 'url("/assets/images/background.jpg")'
              }}
            >
              <div className="flex flex-col items-end w-full h-max">
                <div className="flex flex-col min-w-[5%] max-w-[65%] h-max bg-[#005c4b] p-2 text-white rounded-lg rounded-tr-none mb-3">
                  <div className="flex flex-col w-full break-words">
                    <span>Olá tudo bem com você?</span>
                  </div>
                  <div className="flex justify-end text-[hsla(0,0%,100%,0.6)] text-xs mt-1">
                    <span>18:18</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full h-max">
                <div className="flex flex-col min-w-[5%] max-w-[65%] h-max bg-[#202c33] p-2 text-white rounded-lg rounded-tl-none mb-3">
                  <div className="flex flex-col w-full break-words">
                    <span>Tudo ótimo e com você?</span>
                  </div>
                  <div className="flex justify-end text-[hsla(0,0%,100%,0.6)] text-xs mt-1">
                    <span>18:18</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full h-max">
                <div className="flex flex-col min-w-[5%] max-w-[65%] h-max bg-[#202c33] p-2 text-white rounded-lg rounded-tl-none mb-3">
                  <div className="flex flex-col w-full break-words">
                    <span>Amanhã você irá no churrasco?</span>
                  </div>
                  <div className="flex justify-end text-[hsla(0,0%,100%,0.6)] text-xs mt-1">
                    <span>18:18</span>
                  </div>
                </div>
              </div>
            </div>
            <footer className="flex items-center bg-[#202c33] w-full h-16 py-3 text-[#8696a0]">
              <div className="flex py-1 pl-5 gap-3">
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
                  />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
                  />
                </svg>
              </div>
              <div className="flex w-[85%] h-12 ml-3">
                <input
                  type="text"
                  className="bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white"
                  placeholder="Mensagem"
                  defaultValue=""
                />
              </div>
              <div className="flex justify-center items-center w-[5%] h-12">
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
                  />
                </svg>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="__next-build-watcher"
    style={{
      position: "fixed",
      bottom: 10,
      right: 20,
      width: 0,
      height: 0,
      zIndex: 99999
    }}
  />
 
</>



  );
}

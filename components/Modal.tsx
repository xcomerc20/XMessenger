export const Modal = ({ children, setModal }: any) => {
  return (
    <div
      className="modal"
      style={{
        position: "absolute",
        zIndex: 100,
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
      }}
      onKeyUp={(e) => (e.key === "Escape" ? setModal(false) : "")}
    >
      <div className="content">
        <div className="head" onClick={(e) => setModal(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

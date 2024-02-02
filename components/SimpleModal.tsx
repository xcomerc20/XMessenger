export const SimpleModal = ({ children, setModal }: any) => {
  return (
    <>
      <div
        className="simple-modal"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2,
          width: "100vw",
          height: "100vh",
        }}
        onKeyUp={(e) => (e.key === "Escape" ? setModal(false) : "")}
        onClick={() => setModal(false)}
      ></div>
      {children}
    </>
  );
};

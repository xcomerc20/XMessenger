export default function Splash() {
  return (
    <div
      className="splash flex-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        borderRadius: "0",
        background: "#0c1521",
        padding: 30,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src="/logo.jpg"
        style={{
          width: "5vw",

          borderRadius: "50%",
          margin: "auto",
        }}
        alt=""
      />
    </div>
  );
}

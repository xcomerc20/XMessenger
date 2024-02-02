export default function Splash({ message }: { message?: string }) {
  return (
    <div
      className="splash flex-center"
      style={{
        minHeight: "80vh",
        borderRadius: "0",
        background: "url('/background.png')",
        padding: 30,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <img
        src="/newlogo.png"
        style={{
          width: 175,
          margin: "50px auto",
        }}
        alt=""
      />
      {message && (
        <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          {message}
        </span>
      )}
    </div>
  );
}

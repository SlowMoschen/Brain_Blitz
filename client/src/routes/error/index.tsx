import logo from "../../assets/logoNoText.png";

export default function ErrorPage() {
  function goBack() {
    window.history.back();
  }

  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col justify-center items-center w-full">
      <img src={logo} alt="Logo" className="max-w-[8rem]" />
      <h1 className="text-8xl font-bold text-center animated-bg tracking-wide">404</h1>
      <h2 className="text-2xl opacity-50">Page not found</h2>
      <p className="leading-6 text-pretty m-3">
      Die angeforderte Seite ist nicht verfügbar oder es ist ein Fehler aufgetreten.
        <br />{" "}
        <button className="underline text-primary" onClick={() => goBack()}>
          Gehe zurück
        </button>{" "}
        oder{" "}
        <a href="/contact" className="underline text-primary">
          kontaktiere unseren Support
        </a>.
      </p>
    </div>
  );
}

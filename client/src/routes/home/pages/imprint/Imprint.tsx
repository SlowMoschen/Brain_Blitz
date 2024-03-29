export default function Imprint() {
  return (
    <section className="bg-bg-secondary w-5/6 max-w-4xl p-10 m-10 rounded-lg flex flex-col justify-center">
      <h1 className="text-2xl font-bold border-b-8 border-accent-light text-center">Verantwortlich für den Inhalt dieser Quiz-App:</h1>

      <div className="p-5 m-3 rounded-lg w-full flex justify-center items-center">
        <div>
        <p className="text-xl underline">Kontakt:</p>
        <p>Philipp Millner</p>
        <p>Hütteldorferstraße 185</p>
        <p>1140 Wien</p>
        <p>+43 676 9487 225</p>
        <p>service@brain-blitz.com</p>
        </div>
      </div>

      <p className="leading-7 tracking-wide my-3">
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit, die Sie unter {" "} 
        <a className="text-primary break-all underline" href="http://ec.europa.eu/consumers/odr" target="_blank">
          http://ec.europa.eu/consumers/odr
        </a>{" "}
        finden. Wir sind nicht bereit oder verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>

      <p className="leading-7 tracking-wide my-10 text-lg w-full">
        Diese Angaben gelten auch für unsere {" "}
        <a className="text-primary break-all underline" href="https://linktr.ee/BrainBlitz" target="_blank">Social-Media-Profile</a>
      </p>

      <p className="leading-7 tracking-wide my-3">
        Wir weisen darauf hin, dass jegliche unerlaubte Verwendung von Inhalten
        unserer App oder Teilen davon, einschließlich der Vervielfältigung,
        Verbreitung oder Verwendung in anderen elektronischen oder gedruckten
        Publikationen, ohne unsere ausdrückliche Zustimmung rechtliche Schritte
        nach sich ziehen kann.
      </p>

      <p className="text-sm mt-3 opacity-50">Dieses Impressum wurde zuletzt am 29.03.2024 aktualisiert.</p>
    </section>
  );
}

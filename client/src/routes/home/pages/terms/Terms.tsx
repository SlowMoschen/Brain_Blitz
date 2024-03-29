export default function Terms(): JSX.Element {
  return (
    <section className="bg-bg-secondary w-5/6 max-w-4xl p-10 m-10 rounded-lg flex flex-col justify-center leading-7 tracking-wider break-words">
      <h1 className="text-2xl font-bold border-b-8 border-accent-light text-center">
        Allgemeine Geschäftsbedingungen (AGB)
      </h1>

      <div>
        <h2 className="text-xl font-bold mt-5">
          <span className="text-accent">1.</span> Geltungsbereich
        </h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung der
          Quiz-App, die von Philipp Millner (nachfolgend "Anbieter" genannt)
          betrieben wird. Durch die Nutzung der App akzeptieren Sie diese AGB in
          ihrer jeweils gültigen Fassung.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-5">
          <span className="text-accent">2.</span> Leistungen des Anbieters
        </h2>
        <p>
          Der Anbieter stellt eine Plattform zur Verfügung, auf der Nutzer
          Quizze spielen können. Die Quizze können in verschiedenen Kategorien
          angeboten werden. Der Anbieter behält sich das Recht vor, Inhalte und
          Funktionen der App jederzeit zu ändern, zu erweitern oder
          einzustellen.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-5">
          <span className="text-accent">3.</span> Registrierung, Nutzerkonto
        </h2>
        <p>
          Für die Nutzung einiger Funktionen der App ist eine Registrierung und
          die Erstellung eines Benutzerkontos erforderlich. Sie sind
          verpflichtet, bei der Registrierung korrekte und vollständige
          Informationen anzugeben. Sie sind für die Geheimhaltung Ihrer
          Zugangsdaten verantwortlich und haften für alle Aktivitäten, die unter
          Ihrem Benutzerkonto stattfinden.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-5">
          <span className="text-accent">4.</span> Haftungsausschluss
        </h2>
        <p>
          Der Anbieter beachtet die geltenden Datenschutzbestimmungen. Nähere
          Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden
          Sie in unserer{" "}
          <a href="/privacy" className="text-primary underline">
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-5">
          <span className="text-accent">5.</span> Haftungsausschluss
        </h2>
        <p>
          Der Anbieter haftet nicht für Schäden, die durch die Nutzung der App
          entstehen, es sei denn, sie beruhen auf grober Fahrlässigkeit oder
          Vorsatz des Anbieters. Die Nutzung der App erfolgt auf eigene Gefahr
          des Nutzers.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-5">
          <span className="text-accent">6.</span> Änderung der AGB
        </h2>
        <p>
          Der Anbieter behält sich das Recht vor, diese AGB jederzeit zu ändern.
          Die geänderten AGB werden dem Nutzer rechtzeitig bekannt gegeben.
          Durch die fortgesetzte Nutzung der App nach Bekanntgabe der Änderungen
          erklärt der Nutzer sein Einverständnis mit den neuen AGB.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-5">
          <span className="text-accent">7.</span> Schlussbestimmungen
        </h2>
        <p>
          Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
          berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. Es gilt
          das Recht der Republick Österreich unter Ausschluss des UN-Kaufrechts.
          Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit
          diesen AGB ist der Sitz des Anbieters.
        </p>
      </div>

      <p className="text-sm mt-10 opacity-50">
        Diese Allgemeinen Geschäftsbedingungen wurden zuletzt am 29.03.2024
        aktualisiert.
      </p>
    </section>
  );
}

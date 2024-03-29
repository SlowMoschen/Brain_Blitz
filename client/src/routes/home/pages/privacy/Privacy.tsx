export default function Privacy(): JSX.Element {
  return (
    <section className="bg-bg-secondary w-5/6 max-w-4xl p-10 m-10 rounded-lg flex flex-col justify-center leading-7 tracking-wider break-words">
      <h1 className="text-2xl font-bold border-b-8 border-accent-light text-center">
        Datenschutzerklärung
      </h1>

      <p className="my-5">
        Wir bei Brain Blitz, erreichbar unter der Telefonnummer{" "}
        <span className="text-primary">06769487225</span> und der E-Mail-Adresse{" "}
        <a
          href="mailto:service@brain-blitz.com"
          className="text-primary underline"
        >
          service@brain-blitz.com
        </a>
        , legen großen Wert auf den Schutz Ihrer persönlichen Daten. Diese
        Datenschutzerklärung erläutert, wie wir Ihre Informationen sammeln,
        verwenden, offenlegen und schützen, wenn Sie unsere Quiz-App nutzen.
      </p>

      <div className="my-1">
        <h2 className="text-xl font-bold my-4">
          <span className="text-accent">1.</span> Personenbezogene Daten
        </h2>
        <h3 className="font-semibold">
          <span className="text-accent">1.1</span> Benutzeranmeldung:
        </h3>
        <p className="py-3">
          Für die Nutzung unserer App ist eine Benutzeranmeldung erforderlich.
          Bei der Registrierung sammeln wir personenbezogene Daten wie Ihren
          Namen und Ihre E-Mail-Adresse, um Ihr Benutzerkonto zu erstellen und
          zu verwalten. Diese Informationen werden vertraulich behandelt und
          nicht an Dritte weitergegeben.
        </p>

        <h3 className="font-semibold">
          <span className="text-accent">1.2</span> Verwendung von Cookies:
        </h3>
        <p className="py-3">
          Unsere App verwendet Cookies, um Ihr Benutzererlebnis zu verbessern
          und personalisierte Inhalte bereitzustellen. Cookies sind kleine
          Dateien, die von Ihrem Webbrowser auf Ihrem Gerät gespeichert werden,
          um Informationen über Ihre Aktivitäten auf unserer App zu speichern.
          Sie haben die Möglichkeit, Cookies zu akzeptieren oder abzulehnen.
          Wenn Sie Cookies ablehnen, kann dies jedoch die Funktionalität unserer
          App beeinträchtigen.
        </p>
      </div>

      <div className="my-1">
        <h2 className="text-xl font-bold my-4">
        <span className="text-accent">2.</span> Verwendung von Google Icons:
        </h2>
        <p>
          Wir verwenden Google-Icons in unserer App, um das Benutzererlebnis zu
          verbessern und eine intuitive Navigation zu ermöglichen. Diese Icons
          sind Eigentum von Google und unterliegen den Datenschutzbestimmungen
          von Google.
        </p>
      </div>

      <div className="my-1">
        <h2 className="text-xl font-bold my-4">
        <span className="text-accent">3.</span> Datensicherheit
        </h2>
        <p>
          Wir ergreifen angemessene Maßnahmen, um Ihre persönlichen Daten vor
          Verlust, Missbrauch, unbefugtem Zugriff, Offenlegung, Änderung oder
          Zerstörung zu schützen. Wir speichern Ihre Daten auf sicheren Servern
          und verwenden Verschlüsselungstechnologien, um die Sicherheit Ihrer
          Informationen zu gewährleisten.
        </p>
      </div>

      <div className="my-1">
        <h2 className="text-xl font-bold my-4">
        <span className="text-accent">4.</span> Änderungen an dieser Datenschutzerklärung
        </h2>
        <p>
          Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit
          zu ändern oder zu aktualisieren. Wir empfehlen Ihnen, diese Seite
          regelmäßig zu überprüfen, um über Änderungen informiert zu bleiben.
          Indem Sie unsere App weiterhin nutzen, stimmen Sie den Bedingungen
          dieser Datenschutzerklärung zu.
        </p>
      </div>

      <div className="my-1">
        <h2 className="text-xl font-bold my-4">
        <span className="text-accent">5.</span> Kontaktieren Sie uns
        </h2>
        <p>
          Wenn Sie Fragen oder Bedenken hinsichtlich dieser Datenschutzerklärung
          haben, kontaktieren Sie uns bitte über unser{" "}
          <a href="/contact">Kontaktformular</a>.
        </p>
      </div>

      <p className="text-sm mt-10 opacity-50">
        Diese Datenschutzerklärung wurde zuletzt am 29.03.2024 aktualisiert.
      </p>
    </section>
  );
}

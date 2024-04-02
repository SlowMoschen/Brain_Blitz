interface PrivacyStep {
    headerTitle: string;
    mainText?: string;
    subSteps?: PrivacySubStep[];
}

interface PrivacySubStep {
    title: string;
    text: string;
}

export const privacySteps: PrivacyStep[] = [
    {
        headerTitle: "Personenbezogene Daten:",
        subSteps: [
            {
                title: 'Benutzeranmeldung:',
                text: 'Für die Nutzung unserer App ist eine Benutzeranmeldung erforderlich. Bei der Registrierung sammeln wir personenbezogene Daten wie deinen Namen und deine E-Mail-Adresse, um dein Benutzerkonto zu erstellen und zu verwalten. Diese Informationen werden vertraulich behandelt und nicht an Dritte weitergegeben.'
            },
            {
                title: 'Verwendung von Cookies:',
                text: 'Unsere App verwendet Cookies, um dein Benutzererlebnis zu verbessern und personalisierte Inhalte bereitzustellen. Cookies sind kleine Dateien, die von deinem Webbrowser auf deinem Gerät gespeichert werden, um Informationen über deine Aktivitäten auf unserer App zu speichern. Du hast die Möglichkeit, Cookies zu akzeptieren oder abzulehnen. Wenn du Cookies ablehnst, kann dies jedoch die Funktionalität unserer App beeinträchtigen.'
            },
        ]
    },
    {
        headerTitle: 'Verwendung Services Dritter:',
        subSteps: [
            {
                title: 'Google-Fonts:',
                text: 'Wir verwenden Google-Fonts in unserer App, um eine ansprechende Darstellung von Texten und Schriftarten zu gewährleisten. Diese Fonts sind Eigentum von Google und unterliegen den Datenschutzbestimmungen von Google.'
            },
            {
                title: 'Material-UI:',
                text: 'In unserer Anwendung setzen wir Material-UI-Komponenten und Icons ein, um ein modernes und benutzerfreundliches Design zu realisieren. Um eine einheitliche und ästhetisch ansprechende Darstellung von Symbolen zu gewährleisten, integrieren wir Icons von MUI. Es ist zu beachten, dass sowohl die verwendeten Icons dem Eigentum ihrer jeweiligen Rechteinhaber unterliegen und den entsprechenden Datenschutzbestimmungen unterliegen.'
            }
        ]
    },
    {
        headerTitle: 'Datensicherheit:',
        mainText: 'Wir ergreifen angemessene Maßnahmen, um deine persönlichen Daten vor Verlust, Missbrauch, unbefugtem Zugriff, Offenlegung, Änderung oder Zerstörung zu schützen. Wir speichern deine Daten auf sicheren Servern und verwenden Verschlüsselungstechnologien, um die Sicherheit deiner Informationen zu gewährleisten.'
    },
    {
        headerTitle: 'Änderungen an der Datenschutzerklärung:',
        mainText: 'Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern oder zu aktualisieren. Wir empfehlen, diese Seite regelmäßig zu überprüfen, um über Änderungen informiert zu bleiben. Indem du unsere App weiterhin nützt, stimmst du den Bedingungen dieser Datenschutzerklärung zu.'
    },
    {
        headerTitle: 'Kontaktiere uns:',
        mainText: 'Wenn du Fragen oder Bedenken bezüglich dieser Datenschutzerklärung haben, kontaktiere uns bitte über unser Kontaktformular oder sende eine E-Mail.'
    }
]
/**
 * Datenschutz Page - DSGVO / TTDSG compliant
 */

import { LegalPageLayout } from '@/shared/components/LegalPageLayout';

export const DatenschutzPage = () => {
  return (
    <LegalPageLayout title="Datenschutzerkl&auml;rung" lastUpdated="16. Februar 2026">
      <div className="legal-section">
        <h2>1. Datenschutz auf einen Blick</h2>

        <h3>Allgemeine Hinweise</h3>
        <p>Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.</p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p><strong>Wer ist verantwortlich?</strong><br />
        Daniel Sch&uuml;tzler, Buchenstra&szlig;e 3, 22299 Hamburg<br />
        E-Mail: info@stocknewspulse.info</p>

        <p><strong>Wie erfassen wir Ihre Daten?</strong><br />
        Ihre Daten werden erhoben, wenn Sie sich registrieren, einloggen oder die Website nutzen. Technische Daten (Browsertyp, IP-Adresse, Zugriffszeit) werden automatisch beim Besuch erfasst.</p>

        <p><strong>Wof&uuml;r nutzen wir Ihre Daten?</strong><br />
        Zur Bereitstellung der Website, zur Authentifizierung, zur Anzeige Ihrer gespeicherten Favoriten und Notizen sowie zur Verbesserung unseres Angebots.</p>
      </div>

      <div className="legal-section">
        <h2>2. Hosting</h2>
        <p>Diese Website wird auf einem Server der IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland gehostet. Beim Besuch der Website werden automatisch Informationen in Server-Log-Dateien gespeichert, die Ihr Browser &uuml;bermittelt:</p>
        <ul>
          <li>Browsertyp und -version</li>
          <li>Betriebssystem</li>
          <li>Referrer URL</li>
          <li>IP-Adresse (anonymisiert)</li>
          <li>Uhrzeit der Serveranfrage</li>
        </ul>
        <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien Bereitstellung der Website).</p>
      </div>

      <div className="legal-section">
        <h2>3. Pflichtinformationen</h2>

        <h3>Verantwortliche Stelle</h3>
        <p>Daniel Sch&uuml;tzler<br />
        Buchenstra&szlig;e 3<br />
        22299 Hamburg<br />
        E-Mail: info@stocknewspulse.info</p>

        <h3>Widerruf Ihrer Einwilligung</h3>
        <p>Sofern die Datenverarbeitung auf Ihrer Einwilligung beruht, k&ouml;nnen Sie diese jederzeit widerrufen. Die Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unber&uuml;hrt. Richten Sie Ihren Widerruf an: info@stocknewspulse.info</p>

        <h3>Beschwerderecht bei der Aufsichtsbeh&ouml;rde</h3>
        <p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbeh&ouml;rde zu beschweren. Zust&auml;ndige Aufsichtsbeh&ouml;rde:<br />
        Der Hamburgische Beauftragte f&uuml;r Datenschutz und Informationsfreiheit<br />
        Ludwig-Erhard-Stra&szlig;e 22, 20459 Hamburg<br />
        <a href="https://datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer">https://datenschutz-hamburg.de</a></p>

        <h3>SSL-/TLS-Verschl&uuml;sselung</h3>
        <p>Diese Seite nutzt HTTPS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen Sie am Schloss-Symbol in der Adresszeile Ihres Browsers.</p>
      </div>

      <div className="legal-section">
        <h2>4. Cookies und lokale Speicherung</h2>

        <h3>Technisch notwendige Cookies</h3>
        <p>Wir verwenden folgende technisch notwendige Cookies, die f&uuml;r den Betrieb der Website erforderlich sind. Diese erfordern gem. &sect; 25 Abs. 2 TDDDG keine Einwilligung:</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Name</th>
              <th style={{ padding: '0.5rem' }}>Zweck</th>
              <th style={{ padding: '0.5rem' }}>Dauer</th>
              <th style={{ padding: '0.5rem' }}>Typ</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.5rem' }}><code>JSESSIONID</code></td>
              <td style={{ padding: '0.5rem' }}>Sitzungsverwaltung (Login-Status)</td>
              <td style={{ padding: '0.5rem' }}>30 Tage</td>
              <td style={{ padding: '0.5rem' }}>HTTP-Cookie</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.5rem' }}><code>XSRF-TOKEN</code></td>
              <td style={{ padding: '0.5rem' }}>CSRF-Schutz (Sicherheit gegen Angriffe)</td>
              <td style={{ padding: '0.5rem' }}>Sitzung</td>
              <td style={{ padding: '0.5rem' }}>HTTP-Cookie</td>
            </tr>
          </tbody>
        </table>

        <h3>Lokaler Speicher (localStorage)</h3>
        <p>Wir nutzen den lokalen Speicher Ihres Browsers f&uuml;r folgende Zwecke:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Name</th>
              <th style={{ padding: '0.5rem' }}>Zweck</th>
              <th style={{ padding: '0.5rem' }}>Rechtsgrundlage</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.5rem' }}><code>auth-storage</code></td>
              <td style={{ padding: '0.5rem' }}>Login-Status &uuml;ber Seitenneuladen erhalten</td>
              <td style={{ padding: '0.5rem' }}>&sect; 25 Abs. 2 TDDDG (technisch notwendig)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.5rem' }}><code>cookie_consent</code></td>
              <td style={{ padding: '0.5rem' }}>Speicherung Ihrer Cookie-Einwilligung</td>
              <td style={{ padding: '0.5rem' }}>&sect; 25 Abs. 2 TDDDG (technisch notwendig)</td>
            </tr>
          </tbody>
        </table>

        <h3>Google AdSense (nur mit Einwilligung)</h3>
        <p>Erst nach Ihrer ausdr&uuml;cklichen Einwilligung &uuml;ber unseren Cookie-Banner laden wir Google AdSense. Dabei werden Cookies von Google gesetzt, die der Auslieferung und Analyse von Werbung dienen. Google kann dabei Daten in die USA &uuml;bertragen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Datenschutzerkl&auml;rung</a>.</p>
        <p>Sie k&ouml;nnen Ihre Einwilligung jederzeit widerrufen, indem Sie den Cookie-Speicher in Ihrem Browser l&ouml;schen oder uns per E-Mail kontaktieren.</p>
      </div>

      <div className="legal-section">
        <h2>5. Benutzerkonto und Registrierung</h2>

        <p>Sie k&ouml;nnen auf unserer Website ein Benutzerkonto anlegen. Dabei erheben wir:</p>
        <ul>
          <li>E-Mail-Adresse</li>
          <li>Passwort (verschl&uuml;sselt gespeichert mittels BCrypt)</li>
          <li>Zeitpunkt der Registrierung und des letzten Logins</li>
        </ul>
        <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserf&uuml;llung &ndash; Bereitstellung des Benutzerkontos).</p>
        <p><strong>Speicherdauer:</strong> Ihre Kontodaten werden gespeichert, solange Ihr Konto besteht. Sie k&ouml;nnen Ihr Konto jederzeit in den Einstellungen l&ouml;schen. Dabei werden alle Ihre Daten unwiderruflich entfernt.</p>

        <h3>Google-Anmeldung (OAuth 2.0)</h3>
        <p>Sie k&ouml;nnen sich alternativ &uuml;ber Ihr Google-Konto anmelden. Dabei &uuml;bermittelt Google folgende Daten an uns:</p>
        <ul>
          <li>E-Mail-Adresse</li>
          <li>Name (Vor- und Nachname)</li>
          <li>Profilbild-URL</li>
        </ul>
        <p>Wir speichern davon nur die E-Mail-Adresse. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktives Klicken auf &bdquo;Mit Google anmelden&ldquo;). Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Datenschutzerkl&auml;rung</a>.</p>
      </div>

      <div className="legal-section">
        <h2>6. Externe Dienste</h2>

        <h3>Yahoo Finance API</h3>
        <p>Zur Anzeige von Aktienkursen und Finanzdaten nutzt unser Server die Yahoo Finance API. Die Abfragen erfolgen serverseitig &ndash; Ihre IP-Adresse wird dabei nicht an Yahoo &uuml;bermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Weitere Informationen: <a href="https://legal.yahoo.com/de/de/privacy/index.html" target="_blank" rel="noopener noreferrer">Yahoo Datenschutzerkl&auml;rung</a>.</p>

        <h3>Chart.js</h3>
        <p>Zur Darstellung von Diagrammen verwenden wir die Open-Source-Bibliothek Chart.js. Diese wird lokal im Browser ausgef&uuml;hrt. Es werden keine Daten an externe Server &uuml;bertragen.</p>
      </div>

      <div className="legal-section">
        <h2>7. Ihre Rechte (DSGVO Art. 15&ndash;21)</h2>
        <p>Sie haben folgende Rechte bez&uuml;glich Ihrer personenbezogenen Daten:</p>
        <ul>
          <li><strong>Auskunft</strong> (Art. 15 DSGVO): Welche Daten wir &uuml;ber Sie speichern.</li>
          <li><strong>Berichtigung</strong> (Art. 16 DSGVO): Korrektur unrichtiger Daten.</li>
          <li><strong>L&ouml;schung</strong> (Art. 17 DSGVO): L&ouml;schung Ihrer Daten (&bdquo;Recht auf Vergessenwerden&ldquo;). Dies k&ouml;nnen Sie selbst in den Kontoeinstellungen durchf&uuml;hren.</li>
          <li><strong>Einschr&auml;nkung</strong> (Art. 18 DSGVO): Einschr&auml;nkung der Verarbeitung.</li>
          <li><strong>Daten&uuml;bertragbarkeit</strong> (Art. 20 DSGVO): Export Ihrer Daten in maschinenlesbarem Format. Dies k&ouml;nnen Sie selbst in den Kontoeinstellungen durchf&uuml;hren.</li>
          <li><strong>Widerspruch</strong> (Art. 21 DSGVO): Widerspruch gegen die Verarbeitung.</li>
        </ul>
        <p>Zur Aus&uuml;bung Ihrer Rechte wenden Sie sich an: info@stocknewspulse.info</p>
      </div>

      <div className="legal-section">
        <h2>8. Datensicherheit</h2>
        <p>Wir setzen folgende technische und organisatorische Ma&szlig;nahmen ein:</p>
        <ul>
          <li>HTTPS-Verschl&uuml;sselung (TLS) f&uuml;r alle Verbindungen</li>
          <li>Passw&ouml;rter werden ausschlie&szlig;lich als BCrypt-Hash gespeichert</li>
          <li>Session-Cookies mit HttpOnly- und Secure-Flag</li>
          <li>CSRF-Schutz durch Double-Submit-Cookie-Verfahren</li>
          <li>Datenbankzugang nur &uuml;ber interne Container-Netzwerke</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>9. Kontakt</h2>
        <p>Bei Fragen zum Datenschutz wenden Sie sich an:<br />
        Daniel Sch&uuml;tzler<br />
        E-Mail: info@stocknewspulse.info</p>
      </div>
    </LegalPageLayout>
  );
};

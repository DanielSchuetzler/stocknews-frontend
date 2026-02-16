/**
 * Impressum Page - TMG § 5
 */

import { LegalPageLayout } from '@/shared/components/LegalPageLayout';

export const ImpressumPage = () => {
  return (
    <LegalPageLayout title="Impressum" lastUpdated="Angaben gem. § 5 DDG">
      <div className="legal-section">
        <h2>Betreiber der Website</h2>
        <p>
          Daniel Sch&uuml;tzler<br />
          Buchenstra&szlig;e 3<br />
          22299 Hamburg<br />
          Deutschland
        </p>
      </div>

      <div className="legal-section">
        <h2>Kontakt</h2>
        <p>
          E-Mail: info@stocknewspulse.info
        </p>
      </div>

      <div className="legal-section">
        <h2>Verantwortlich f&uuml;r den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Daniel Sch&uuml;tzler<br />
          Buchenstra&szlig;e 3<br />
          22299 Hamburg
        </p>
      </div>

      <div className="legal-section">
        <h2>Haftungsausschluss</h2>

        <h3>Haftung f&uuml;r Inhalte</h3>
        <p>Als Diensteanbieter sind wir gem. § 7 Abs. 1 DDG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.</p>
        <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

        <h3>Haftung f&uuml;r Links</h3>
        <p>Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

        <h3>Urheberrecht</h3>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
      </div>

      <div className="legal-section">
        <h2>Streitschlichtung</h2>
        <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.</p>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>

      <div className="legal-section">
        <h2>Finanzrechtliche Hinweise</h2>

        <h3>Keine Anlageberatung</h3>
        <p><strong>WICHTIG:</strong> StockNewsPulse ist ein reines Informations- und Visualisierungs-Tool. Es werden keine Finanzdienstleistungen im Sinne des Kreditwesengesetzes (KWG) und keine Anlageberatung im Sinne des Wertpapierhandelsgesetzes (WpHG) erbracht.</p>

        <h3>Keine Empfehlung zum Kauf oder Verkauf</h3>
        <p>Alle bereitgestellten Informationen, Charts und Daten dienen ausschlie&szlig;lich zu allgemeinen Informations- und Bildungszwecken. Sie stellen keine Aufforderung zum Kauf oder Verkauf von Wertpapieren oder anderen Finanzinstrumenten dar.</p>

        <h3>Eigenverantwortung</h3>
        <p>Jede Investitionsentscheidung erfolgt auf eigene Verantwortung und eigenes Risiko. Der Betreiber &uuml;bernimmt keinerlei Haftung f&uuml;r Verluste oder Sch&auml;den, die durch die Nutzung der bereitgestellten Informationen entstehen.</p>

        <h3>Keine Gew&auml;hr f&uuml;r Richtigkeit</h3>
        <p>Trotz sorgf&auml;ltiger Recherche kann keine Gew&auml;hr f&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und Aktualit&auml;t der bereitgestellten Daten &uuml;bernommen werden. Kursinformationen k&ouml;nnen verz&ouml;gert sein.</p>

        <h3>Historische Daten</h3>
        <p>Vergangene Wertentwicklungen sind kein verl&auml;sslicher Indikator f&uuml;r die zuk&uuml;nftige Wertentwicklung.</p>
      </div>
    </LegalPageLayout>
  );
};

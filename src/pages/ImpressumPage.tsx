/**
 * Impressum Page
 */

import { LegalPageLayout } from '@/shared/components/LegalPageLayout';

export const ImpressumPage = () => {
  return (
    <LegalPageLayout title="Impressum" lastUpdated="Angaben gemäß § 5 TMG">
      <div className="legal-section">
        <h2>Betreiber der Website</h2>
        <p>
          <strong>StockNewsPulse - Finanzanalyse & Research</strong><br />
          Max Mustermann<br />
          Musterstraße 123<br />
          12345 Musterstadt<br />
          Deutschland
        </p>
      </div>

      <div className="legal-section">
        <h2>Kontakt</h2>
        <p>
          E-Mail: kontakt@stocknewspulse.de<br />
          Telefon: +49 (0) 123 456789
        </p>
      </div>

      <div className="legal-section">
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
          DE123456789
        </p>
      </div>

      <div className="legal-section">
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Max Mustermann<br />
          Musterstraße 123<br />
          12345 Musterstadt
        </p>
      </div>

      <div className="legal-section">
        <h2>Haftungsausschluss</h2>

        <h3>Haftung für Inhalte</h3>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
        <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

        <h3>Haftung für Links</h3>
        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
        <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

        <h3>Urheberrecht</h3>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
        <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
      </div>

      <div className="legal-section">
        <h2>Streitschlichtung</h2>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.</p>
        <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>

      <div className="legal-section">
        <h2>Finanzrechtliche Hinweise</h2>

        <h3>Keine Anlageberatung</h3>
        <p><strong>WICHTIG:</strong> StockNewsPulse ist ein reines Informations- und Analyse-Tool. Wir erbringen keine Finanzdienstleistungen im Sinne des Kreditwesengesetzes (KWG) und keine Anlageberatung im Sinne des Wertpapierhandelsgesetzes (WpHG).</p>

        <h3>Keine Empfehlung zum Kauf oder Verkauf</h3>
        <p>Alle auf dieser Website bereitgestellten Informationen, Analysen, Charts und Daten dienen ausschließlich zu allgemeinen Informations- und Bildungszwecken. Sie stellen keine Aufforderung zum Kauf oder Verkauf von Wertpapieren oder anderen Finanzinstrumenten dar.</p>

        <h3>Eigenverantwortung</h3>
        <p>Jede Investitionsentscheidung erfolgt auf eigene Verantwortung und eigenes Risiko. Der Betreiber übernimmt keinerlei Haftung für Verluste oder Schäden, die durch die Nutzung der auf dieser Website bereitgestellten Informationen entstehen.</p>

        <h3>Keine Gewähr für Richtigkeit</h3>
        <p>Trotz sorgfältiger Recherche und regelmäßiger Aktualisierung kann keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Daten übernommen werden. Kursinformationen können verzögert sein.</p>

        <h3>Historische Daten</h3>
        <p>Vergangene Wertentwicklungen, Simulationen oder Prognosen sind kein verlässlicher Indikator für die zukünftige Wertentwicklung. Historische Renditen bieten keine Garantie für zukünftige Erträge.</p>
      </div>
    </LegalPageLayout>
  );
};

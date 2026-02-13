/**
 * Quellennachweise Page
 */

import { LegalPageLayout } from '@/shared/components/LegalPageLayout';

export const QuellenPage = () => {
  return (
    <LegalPageLayout title="Quellennachweise" lastUpdated="Herkunft und Lizenzinformationen verwendeter Ressourcen">
      <div className="legal-section">
        <h2>Verwendete Bilder und Grafiken</h2>
        <p>Die folgenden Bilder und Grafiken werden auf dieser Website verwendet. Alle Bilder stammen aus lizenzfreien Quellen oder wurden unter Creative Commons Lizenzen veröffentlicht.</p>
      </div>

      <div className="legal-section">
        <h3>Logo & Icons</h3>
        <p><strong>Quelle:</strong> SVG-Icons selbst erstellt</p>
        <p><strong>Verwendung:</strong> Navigationbar, Value Props, Visual Demo</p>
        <p><strong>Lizenz:</strong> Eigene Erstellung</p>
        <p><strong>Details:</strong> Alle SVG-Icons (Blitz-Logo, Such-Icons, Chart-Visualisierungen) wurden speziell für diese Plattform erstellt.</p>
      </div>

      <div className="legal-section">
        <h3>Chart-Visualisierungen</h3>
        <p><strong>Quelle:</strong> Chart.js Library & eigene SVG-Grafiken</p>
        <p><strong>Verwendung:</strong> Aktienkurs-Darstellung, Beispiel-Charts</p>
        <p><strong>Lizenz:</strong> Chart.js - MIT License</p>
        <p><strong>Link:</strong> <a href="https://www.chartjs.org" target="_blank" rel="noopener noreferrer">https://www.chartjs.org</a></p>
      </div>

      <div className="legal-section">
        <h3>Emoji & Unicode-Symbole</h3>
        <p><strong>Quelle:</strong> Unicode Standard</p>
        <p><strong>Verwendung:</strong> Value Props, Footer, Verschiedene UI-Elemente</p>
        <p><strong>Lizenz:</strong> Public Domain</p>
        <p><strong>Details:</strong> Alle verwendeten Emojis sind Teil des Unicode-Standards und frei verwendbar.</p>
      </div>

      <div className="legal-section">
        <h2>Datenquellen & Haftungsausschluss</h2>

        <h3>Aktienkursdaten</h3>
        <p><strong>Quelle:</strong> Yahoo Finance API</p>
        <p><strong>Lizenz:</strong> Nutzung gemäß Yahoo Finance Nutzungsbedingungen für informationelle Zwecke</p>
        <p><strong>Link:</strong> <a href="https://finance.yahoo.com" target="_blank" rel="noopener noreferrer">https://finance.yahoo.com</a></p>
        <p><strong>Hinweis:</strong> Kursdaten können mit Verzögerung dargestellt werden. Es wird keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der Daten übernommen. Die Daten dienen ausschließlich zu Informations- und Bildungszwecken.</p>
      </div>

      <div className="legal-section">
        <h3>Unternehmensdaten</h3>
        <p><strong>Quelle:</strong> Öffentlich zugängliche Unternehmensinformationen, Geschäftsberichte, Investor Relations Websites</p>
        <p><strong>Verarbeitung:</strong> Unternehmensbeschreibungen basieren auf öffentlich verfügbaren Informationen und wurden redaktionell aufbereitet. Alle Angaben ohne Gewähr.</p>
        <p><strong>Wichtig:</strong> Die Beschreibungen dienen der allgemeinen Information und stellen keine Anlageberatung oder Empfehlung dar.</p>
      </div>

      <div className="legal-section">
        <h3>News-Daten</h3>
        <p><strong>Quelle:</strong> Verschiedene öffentliche News-Quellen und APIs</p>
        <p><strong>Verarbeitung:</strong> News-Daten werden automatisch aggregiert und mit Sentiment-Analyse versehen. Die Sentiment-Einstufung (positiv/negativ) erfolgt automatisiert und kann subjektiv sein.</p>
        <p><strong>Haftungsausschluss:</strong> Trotz sorgfältiger Prüfung keine Gewähr für die Richtigkeit der Sentiment-Einstufungen. News-Daten können unvollständig oder veraltet sein.</p>
      </div>

      <div className="legal-section">
        <h2>Verwendete Technologien & Libraries</h2>

        <h3>Frontend-Framework</h3>
        <p><strong>React:</strong> UI-Framework - MIT License<br />
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">https://react.dev</a></p>
        <p><strong>TypeScript:</strong> Type-Safety - Apache 2.0 License<br />
        <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer">https://www.typescriptlang.org</a></p>
        <p><strong>Vite:</strong> Build Tool - MIT License<br />
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">https://vitejs.dev</a></p>
      </div>

      <div className="legal-section">
        <h3>Backend-Framework</h3>
        <p><strong>Spring Boot:</strong> Java Backend Framework - Apache 2.0 License<br />
        <a href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener noreferrer">https://spring.io/projects/spring-boot</a></p>
        <p><strong>PostgreSQL:</strong> Relationale Datenbank - PostgreSQL License<br />
        <a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer">https://www.postgresql.org</a></p>
      </div>

      <div className="legal-section">
        <h3>Weitere Libraries</h3>
        <p><strong>TanStack Query:</strong> Data Fetching - MIT License<br />
        <strong>React Router:</strong> Routing - MIT License<br />
        <strong>Chart.js:</strong> Diagramme - MIT License</p>
      </div>

      <div className="legal-section">
        <h2>Wichtiger Hinweis</h2>
        <p style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <strong>Keine Anlageberatung:</strong> Alle auf dieser Website bereitgestellten Informationen, Analysen und Visualisierungen dienen ausschließlich zu allgemeinen Informations- und Bildungszwecken. Sie stellen keine Anlageberatung, Finanzberatung oder Empfehlung zum Kauf oder Verkauf von Wertpapieren dar. Vergangene Wertentwicklungen sind kein verlässlicher Indikator für zukünftige Ergebnisse.
        </p>
      </div>

      <div className="legal-section">
        <h2>Kontakt</h2>
        <p>Bei Fragen zu den verwendeten Quellen oder Lizenzinformationen wenden Sie sich bitte an:</p>
        <p><strong>E-Mail:</strong> kontakt@stocknewspulse.de</p>
      </div>
    </LegalPageLayout>
  );
};

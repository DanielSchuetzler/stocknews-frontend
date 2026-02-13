/**
 * Erklärung Page
 * Explains Event-Driven Trading with practical examples
 */

export const ErklärungPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)'
    }}>
      {/* Disclaimer Banner */}
      <div style={{
        background: 'rgba(251, 146, 60, 0.08)',
        borderBottom: '1px solid rgba(251, 146, 60, 0.2)',
        padding: '1rem 0'
      }}>
        <div className="app-container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          justifyContent: 'center'
        }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            style={{
              width: '20px',
              height: '20px',
              color: '#f97316',
              flexShrink: 0
            }}
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p style={{
            color: '#ea580c',
            fontWeight: 500,
            fontSize: '0.875rem',
            margin: 0
          }}>
            <strong>Wichtiger Hinweis:</strong> Diese Beispiele dienen nur zur Illustration. Keine Anlageberatung.
          </p>
        </div>
      </div>

      <div className="app-container" style={{ padding: '3rem var(--spacing-md)' }}>
        {/* Page Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            So funktioniert's
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Verstehe anhand von echten Szenarien, wie News Aktienkurse beeinflussen
          </p>
        </header>

        {/* Examples Section */}
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          marginBottom: '5rem'
        }}>
          {/* Example 1: SK Hynix - Positive */}
          <div style={{
            background: 'var(--surface)',
            borderRadius: '12px',
            padding: '2.5rem',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0
              }}>
                SK Hynix (Speicherchips)
              </h2>
              <span style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                Positives Beispiel
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Chart */}
              <div>
                <svg viewBox="0 0 400 250" style={{ width: '100%', height: 'auto' }}>
                  {/* Y-Axis Labels */}
                  <text x="10" y="30" fill="var(--text-muted)" fontSize="12">100€</text>
                  <text x="10" y="80" fill="var(--text-muted)" fontSize="12">80€</text>
                  <text x="10" y="130" fill="var(--text-muted)" fontSize="12">60€</text>
                  <text x="10" y="180" fill="var(--text-muted)" fontSize="12">40€</text>
                  <text x="10" y="230" fill="var(--text-muted)" fontSize="12">20€</text>

                  {/* Chart Line */}
                  <polyline
                    points="50,200 60,199 70,197 80,198 90,196 100,194 110,193 120,192 130,190 140,188 150,180 160,174 170,169 180,164 190,158 200,152 210,146 220,141 230,136 240,130 250,120 260,114 270,109 280,105 290,102 300,100 310,98 320,97"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* News Marker 1 */}
                  <circle cx="150" cy="180" r="8" fill="#10b981">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <line x1="150" y1="180" x2="150" y2="50" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />

                  {/* News Marker 2 */}
                  <circle cx="250" cy="120" r="8" fill="#10b981">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <line x1="250" y1="120" x2="250" y2="50" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />

                  {/* X-Axis Labels */}
                  <text x="50" y="245" fill="var(--text-muted)" fontSize="12">Jan</text>
                  <text x="100" y="245" fill="var(--text-muted)" fontSize="12">Feb</text>
                  <text x="150" y="245" fill="var(--text-muted)" fontSize="12">Mrz</text>
                  <text x="200" y="245" fill="var(--text-muted)" fontSize="12">Apr</text>
                  <text x="250" y="245" fill="var(--text-muted)" fontSize="12">Mai</text>
                  <text x="300" y="245" fill="var(--text-muted)" fontSize="12">Jun</text>
                </svg>
              </div>

              {/* News Events */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      background: '#10b981',
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      1
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      März: RAM-Knappheit angekündigt
                    </h3>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem'
                  }}>
                    Industrie-Analysten prognostizieren globale Knappheit bei Arbeitsspeicher aufgrund steigender Nachfrage durch KI-Server.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kurseffekt:</span>
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem' }}>+12%</span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      background: '#10b981',
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      2
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      Mai: Technologieführerschaft bestätigt
                    </h3>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem'
                  }}>
                    SK Hynix präsentiert beste RAM-Technologie am Markt mit 30% höherer Geschwindigkeit als Konkurrenz.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kurseffekt:</span>
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem' }}>+18%</span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <p style={{
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    margin: 0
                  }}>
                    <strong>Lerneffekt:</strong> Positive Branchennews (Knappheit) + Technologievorsprung = Nachhaltiger Kursanstieg
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2: Munich Re - Negative */}
          <div style={{
            background: 'var(--surface)',
            borderRadius: '12px',
            padding: '2.5rem',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0
              }}>
                Munich Re (Rückversicherung)
              </h2>
              <span style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                Negatives Beispiel
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Chart */}
              <div>
                <svg viewBox="0 0 400 250" style={{ width: '100%', height: 'auto' }}>
                  {/* Y-Axis Labels */}
                  <text x="10" y="30" fill="var(--text-muted)" fontSize="12">400€</text>
                  <text x="10" y="80" fill="var(--text-muted)" fontSize="12">350€</text>
                  <text x="10" y="130" fill="var(--text-muted)" fontSize="12">300€</text>
                  <text x="10" y="180" fill="var(--text-muted)" fontSize="12">250€</text>
                  <text x="10" y="230" fill="var(--text-muted)" fontSize="12">200€</text>

                  {/* Chart Line */}
                  <polyline
                    points="50,65 60,66 70,68 80,69 90,72 100,74 110,77 120,83 130,90 140,97 150,104 160,111 170,118 180,125 190,132 200,139 210,146 220,155 230,162 240,168 250,174 260,179 270,184 280,188 290,191 300,194 310,196 320,198"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                  />

                  {/* News Marker 1 */}
                  <circle cx="120" cy="83" r="8" fill="#ef4444">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <line x1="120" y1="83" x2="120" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />

                  {/* News Marker 2 */}
                  <circle cx="220" cy="155" r="8" fill="#ef4444">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <line x1="220" y1="155" x2="220" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />

                  {/* X-Axis Labels */}
                  <text x="50" y="245" fill="var(--text-muted)" fontSize="12">Jul</text>
                  <text x="100" y="245" fill="var(--text-muted)" fontSize="12">Aug</text>
                  <text x="150" y="245" fill="var(--text-muted)" fontSize="12">Sep</text>
                  <text x="200" y="245" fill="var(--text-muted)" fontSize="12">Okt</text>
                  <text x="250" y="245" fill="var(--text-muted)" fontSize="12">Nov</text>
                  <text x="300" y="245" fill="var(--text-muted)" fontSize="12">Dez</text>
                </svg>
              </div>

              {/* News Events */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      background: '#ef4444',
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      1
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      Aug: Marktüberversorgung gemeldet
                    </h3>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem'
                  }}>
                    Zu viele Rückversicherer am Markt führen zu Preiskampf. Margen fallen auf historische Tiefststände.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kurseffekt:</span>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem' }}>-8%</span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      background: '#ef4444',
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      2
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      Nov: Gewinnwarnung ausgegeben
                    </h3>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem'
                  }}>
                    Schwache Preisdurchsetzung und steigende Schadensfälle durch Extremwetter belasten Ergebnis.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kurseffekt:</span>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem' }}>-12%</span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <p style={{
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    margin: 0
                  }}>
                    <strong>Lerneffekt:</strong> Marktüberversorgung + Gewinnwarnung = Anhaltender Abwärtstrend
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example 3: Tesla - Mixed */}
          <div style={{
            background: 'var(--surface)',
            borderRadius: '12px',
            padding: '2.5rem',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0
              }}>
                Tesla (Elektrofahrzeuge)
              </h2>
              <span style={{
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                Volatiles Beispiel
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Chart */}
              <div>
                <svg viewBox="0 0 400 250" style={{ width: '100%', height: 'auto' }}>
                  {/* Y-Axis Labels */}
                  <text x="10" y="30" fill="var(--text-muted)" fontSize="12">280€</text>
                  <text x="10" y="80" fill="var(--text-muted)" fontSize="12">240€</text>
                  <text x="10" y="130" fill="var(--text-muted)" fontSize="12">200€</text>
                  <text x="10" y="180" fill="var(--text-muted)" fontSize="12">160€</text>
                  <text x="10" y="230" fill="var(--text-muted)" fontSize="12">120€</text>

                  {/* Chart Line */}
                  <polyline
                    points="50,130 60,128 70,125 80,123 90,121 100,119 110,116 120,112 130,95 140,93 150,97 160,103 170,107 180,104 190,100 200,98 210,120 220,128 230,133 240,127 250,120 260,123 270,130 280,132 290,128 300,125 310,123 320,122"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />

                  {/* Positive News Marker */}
                  <circle cx="130" cy="95" r="8" fill="#10b981">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <line x1="130" y1="95" x2="130" y2="50" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Negative News Marker */}
                  <circle cx="210" cy="120" r="8" fill="#ef4444">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <line x1="210" y1="120" x2="210" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />

                  {/* X-Axis Labels */}
                  <text x="50" y="245" fill="var(--text-muted)" fontSize="12">Jan</text>
                  <text x="100" y="245" fill="var(--text-muted)" fontSize="12">Feb</text>
                  <text x="150" y="245" fill="var(--text-muted)" fontSize="12">Mrz</text>
                  <text x="200" y="245" fill="var(--text-muted)" fontSize="12">Apr</text>
                  <text x="250" y="245" fill="var(--text-muted)" fontSize="12">Mai</text>
                  <text x="300" y="245" fill="var(--text-muted)" fontSize="12">Jun</text>
                </svg>
              </div>

              {/* News Events */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      background: '#10b981',
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      1
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      Feb: Rekord-Auslieferungen verkündet
                    </h3>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem'
                  }}>
                    Tesla meldet Rekordquartal mit 500.000 ausgelieferten Fahrzeugen - über den Erwartungen.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kurseffekt:</span>
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem' }}>+15%</span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      background: '#ef4444',
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      2
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      Apr: Rückruf wegen Softwarefehler
                    </h3>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem'
                  }}>
                    2 Millionen Fahrzeuge müssen wegen Autopilot-Software zurückgerufen werden. Imageschaden befürchtet.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kurseffekt:</span>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem' }}>-11%</span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <p style={{
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    margin: 0
                  }}>
                    <strong>Lerneffekt:</strong> Starke operative Leistung wird durch negative Sicherheitsnews konterkariert = Hohe Volatilität
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event-Driven Trading Explanation Section */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '3rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '3rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Event-Driven Trading
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Die professionelle Methode, um Marktbewegungen zu verstehen
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}>
            {/* Step 1: Grundlagen */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.05)',
              padding: '2rem',
              borderRadius: '10px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-block',
                marginBottom: '1rem'
              }}>
                1. Grundlagen
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Was ist Event-Driven Trading?
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1rem'
              }}>
                Aktienkurse reagieren nicht zufällig auf Nachrichten. Professionelle Trader wissen: Bestimmte Event-Typen führen zu vorhersehbaren Mustern. Quartalsberichte, Produktankündigungen, regulatorische Entscheidungen – jedes Event hat historische Präzedenzfälle.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7
              }}>
                Event-Driven Trading bedeutet, diese systematischen Zusammenhänge zwischen News-Events und Kursbewegungen zu verstehen und für bessere Investmententscheidungen zu nutzen.
              </p>
            </div>

            {/* Step 2: Der Vorteil */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.05)',
              padding: '2rem',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{
                background: '#10b981',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-block',
                marginBottom: '1rem'
              }}>
                2. Der Vorteil
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Warum nutzen Profis diese Methode?
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1rem'
              }}>
                Große Investmentbanken und Hedgefonds nutzen seit Jahren Event-Driven-Strategien, um Marktbewegungen zu verstehen und vorherzusagen. Sie geben Millionen für komplexe Analytics-Plattformen aus, um Muster zu erkennen: Welche News führten zu welchen Kursbewegungen? Wie lange dauerte die Reaktion? War der Effekt nachhaltig?
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7
              }}>
                Diese systematische Analyse ermöglicht datengetriebene Entscheidungen statt emotionaler Reaktionen – und genau das macht den Unterschied zwischen professionellen und privaten Investoren aus.
              </p>
            </div>

            {/* Step 3: Deine Anwendung */}
            <div style={{
              background: 'rgba(168, 85, 247, 0.05)',
              padding: '2rem',
              borderRadius: '10px',
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}>
              <div style={{
                background: '#a855f7',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-block',
                marginBottom: '1rem'
              }}>
                3. Deine Anwendung
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Wie nutzt du Event-Driven Trading?
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1rem'
              }}>
                Mit StockNewsPulse erhältst du Zugang zu derselben Methodik wie institutionelle Investoren – kostenlos und verständlich aufbereitet. Unsere Visualisierung zeigt dir die historischen Zusammenhänge: Wenn eine Aktie bei positiven Quartalsberichten historisch um 5-8% steigt, ist das ein wertvoller Datenpunkt.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7
              }}>
                Identifiziere Muster selbst, verstehe wie der Markt auf verschiedene Event-Typen reagiert, und entwickle ein tieferes Verständnis für die Faktoren, die Aktienkurse wirklich bewegen.
              </p>
            </div>
          </div>

          {/* Benefits Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
            padding: '2.5rem',
            borderRadius: '10px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            marginTop: '3rem'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Deine Vorteile auf einen Blick
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.25rem'
            }}>
              {[
                { title: 'Visualisierte News-Analyse', desc: 'Sieh sofort, welche Nachrichten den Kurs bewegten' },
                { title: 'Historischer Kontext', desc: 'Verstehe, wie ähnliche Events in der Vergangenheit wirkten' },
                { title: 'Sentiment-Tracking', desc: 'Positive und negative News klar gekennzeichnet' },
                { title: 'Kursreaktionen quantifiziert', desc: 'Prozentuale Veränderungen direkt sichtbar' },
                { title: 'Interaktive Charts', desc: 'Zoome, scrolle und erkunde die Daten intuitiv' },
                { title: 'Eigene News hinzufügen', desc: 'Erweitere die Analyse mit deinen eigenen Recherchen' }
              ].map((benefit, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    color: 'var(--primary-color)',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    ✓
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                      {benefit.title}:
                    </strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      {benefit.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          padding: '3rem 2rem',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Jetzt selbst ausprobieren
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Analysiere echte Aktienkurse und entdecke den Zusammenhang zwischen News und Kursbewegungen
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              background: 'var(--primary-color)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
          >
            Zur Aktienanalyse
          </a>
        </section>
      </div>
    </div>
  );
};

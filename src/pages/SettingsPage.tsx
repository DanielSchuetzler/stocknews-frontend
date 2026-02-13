/**
 * User Settings Page
 *
 * DSGVO-compliant user settings with:
 * - Profile editing (username, email)
 * - Password change
 * - Account deletion (prominent and easy to find)
 * - Data export (DSGVO Article 15 - Right to data portability)
 *
 * Legal compliance:
 * - Account deletion must be easily accessible (DSGVO Article 17)
 * - Clear warning before deletion
 * - Data export functionality
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import {
  useUpdateProfile,
  useChangePassword,
  useDeleteAccount,
  useExportUserData,
} from '@/entities/auth/queries';
import { getErrorMessage } from '@/shared/api/client';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mutations
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();
  const deleteAccountMutation = useDeleteAccount();
  const exportDataMutation = useExportUserData();

  // Profile editing state
  const [email, setEmail] = useState(user?.email || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Account deletion state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  // Status messages - separate for each section
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [exportMessage, setExportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleProfileUpdate = async () => {
    setProfileMessage(null); // Clear previous messages
    try {
      await updateProfileMutation.mutateAsync({ email });
      setProfileMessage({ type: 'success', text: 'Profil erfolgreich aktualisiert' });
      setIsEditingProfile(false);
    } catch (error) {
      setProfileMessage({
        type: 'error',
        text: getErrorMessage(error) || 'Fehler beim Aktualisieren des Profils',
      });
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMessage(null); // Clear previous messages

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwörter stimmen nicht überein' });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: 'Passwort muss mindestens 8 Zeichen lang sein' });
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({ currentPassword, newPassword });
      setPasswordMessage({ type: 'success', text: 'Passwort erfolgreich geändert' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordSection(false);
    } catch (error) {
      setPasswordMessage({
        type: 'error',
        text: getErrorMessage(error) || 'Fehler beim Ändern des Passworts',
      });
    }
  };

  const handleDataExport = async () => {
    setExportMessage(null); // Clear previous messages
    try {
      await exportDataMutation.mutateAsync();
      setExportMessage({ type: 'success', text: 'Daten erfolgreich exportiert' });
    } catch (error) {
      setExportMessage({
        type: 'error',
        text: getErrorMessage(error) || 'Fehler beim Exportieren der Daten',
      });
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteMessage(null); // Clear previous messages

    if (deleteConfirmText !== user?.email) {
      setDeleteMessage({ type: 'error', text: 'Bitte gib deine E-Mail-Adresse korrekt ein' });
      return;
    }

    if (!deletePassword) {
      setDeleteMessage({ type: 'error', text: 'Bitte gib dein Passwort ein' });
      return;
    }

    try {
      // Note: useDeleteAccount mutation handles navigation and store clearing automatically
      await deleteAccountMutation.mutateAsync({ password: deletePassword });
    } catch (error) {
      setDeleteMessage({
        type: 'error',
        text: getErrorMessage(error) || 'Fehler beim Löschen des Accounts',
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      padding: '2rem 0'
    }}>
      <div className="app-container" style={{ maxWidth: '800px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            Einstellungen
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Verwalte deine Kontodaten und Einstellungen
          </p>
        </div>

        {/* Profile Section */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              Profil
            </h2>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Bearbeiten
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                E-Mail
              </label>
              {isEditingProfile ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  name="settings-email"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--background)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              ) : (
                <div style={{
                  padding: '0.75rem',
                  background: 'var(--background)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)'
                }}>
                  {user.email}
                </div>
              )}
            </div>

            {isEditingProfile && (
              <>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={handleProfileUpdate}
                    className="btn-primary"
                    style={{ padding: '0.75rem 1.5rem' }}
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? 'Wird gespeichert...' : 'Speichern'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingProfile(false);
                      setEmail(user.email);
                      setProfileMessage(null);
                    }}
                    className="btn-secondary"
                    style={{ padding: '0.75rem 1.5rem' }}
                  >
                    Abbrechen
                  </button>
                </div>

                {/* Profile Status Message */}
                {profileMessage && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    marginTop: '1rem',
                    borderRadius: '6px',
                    background: profileMessage.type === 'success'
                      ? 'rgba(16, 185, 129, 0.1)'
                      : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${profileMessage.type === 'success' ? '#10b981' : '#ef4444'}`,
                    color: profileMessage.type === 'success' ? '#10b981' : '#ef4444',
                    fontSize: '0.875rem'
                  }}>
                    {profileMessage.text}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Password Section */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: showPasswordSection ? '1.5rem' : '0'
          }}>
            <div>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.25rem'
              }}>
                Passwort
              </h2>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}>
                Ändere dein Passwort für mehr Sicherheit
              </p>
            </div>
            {!showPasswordSection && (
              <button
                onClick={() => setShowPasswordSection(true)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Ändern
              </button>
            )}
          </div>

          {showPasswordSection && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem'
                }}>
                  Aktuelles Passwort
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                  name="settings-current-password"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--background)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem'
                }}>
                  Neues Passwort
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  name="settings-new-password"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--background)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                  placeholder="Mindestens 8 Zeichen"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem'
                }}>
                  Passwort bestätigen
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  name="settings-confirm-password"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--background)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  onClick={handlePasswordChange}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.5rem' }}
                  disabled={
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword ||
                    changePasswordMutation.isPending
                  }
                >
                  {changePasswordMutation.isPending ? 'Wird geändert...' : 'Passwort ändern'}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordSection(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordMessage(null);
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Abbrechen
                </button>
              </div>

              {/* Password Status Message */}
              {passwordMessage && (
                <div style={{
                  padding: '0.75rem 1rem',
                  marginTop: '1rem',
                  borderRadius: '6px',
                  background: passwordMessage.type === 'success'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${passwordMessage.type === 'success' ? '#10b981' : '#ef4444'}`,
                  color: passwordMessage.type === 'success' ? '#10b981' : '#ef4444',
                  fontSize: '0.875rem'
                }}>
                  {passwordMessage.text}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Data Export Section (DSGVO Article 15) */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            Datenexport
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            lineHeight: 1.6
          }}>
            Lade eine Kopie deiner Daten herunter (DSGVO Artikel 15 - Recht auf Datenübertragbarkeit).
            Dies umfasst dein Profil, deine News-Einträge und Favoriten.
          </p>
          <button
            onClick={handleDataExport}
            className="btn-secondary"
            style={{ padding: '0.75rem 1.5rem' }}
            disabled={exportDataMutation.isPending}
          >
            {exportDataMutation.isPending ? '⏳ Wird exportiert...' : '📥 Daten exportieren (JSON)'}
          </button>

          {/* Export Status Message */}
          {exportMessage && (
            <div style={{
              padding: '0.75rem 1rem',
              marginTop: '1rem',
              borderRadius: '6px',
              background: exportMessage.type === 'success'
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${exportMessage.type === 'success' ? '#10b981' : '#ef4444'}`,
              color: exportMessage.type === 'success' ? '#10b981' : '#ef4444',
              fontSize: '0.875rem'
            }}>
              {exportMessage.text}
            </div>
          )}
        </section>

        {/* Account Deletion Section (DSGVO Article 17 - PROMINENT!) */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2rem',
          border: '2px solid rgba(239, 68, 68, 0.3)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#ef4444',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ⚠️ Account löschen
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            lineHeight: 1.6
          }}>
            Die Löschung deines Accounts ist <strong>dauerhaft und unwiderruflich</strong>.
            Alle deine Daten (Profil, News-Einträge, Favoriten) werden permanent gelöscht.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#dc2626'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#ef4444'}
            >
              Account löschen
            </button>
          ) : (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <p style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#ef4444',
                marginBottom: '1rem'
              }}>
                Bist du sicher? Diese Aktion kann nicht rückgängig gemacht werden!
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                Gib deine E-Mail-Adresse <strong>"{user.email}"</strong> ein, um zu bestätigen:
              </p>
              <input
                type="email"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={user.email}
                autoComplete="off"
                name="delete-confirm-email"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--background)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              />
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                Gib dein Passwort ein:
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Passwort"
                autoComplete="current-password"
                name="delete-confirm-password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--background)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleDeleteAccount}
                  disabled={
                    deleteConfirmText !== user.email ||
                    !deletePassword ||
                    deleteAccountMutation.isPending
                  }
                  style={{
                    padding: '0.75rem 1.5rem',
                    background:
                      deleteConfirmText === user.email &&
                      deletePassword &&
                      !deleteAccountMutation.isPending
                        ? '#ef4444'
                        : '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor:
                      deleteConfirmText === user.email &&
                      deletePassword &&
                      !deleteAccountMutation.isPending
                        ? 'pointer'
                        : 'not-allowed',
                    opacity:
                      deleteConfirmText === user.email &&
                      deletePassword &&
                      !deleteAccountMutation.isPending
                        ? 1
                        : 0.5,
                    transition: 'all 0.2s',
                  }}
                >
                  {deleteAccountMutation.isPending
                    ? 'Wird gelöscht...'
                    : 'Ja, Account endgültig löschen'}
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText('');
                    setDeletePassword('');
                    setDeleteMessage(null);
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Abbrechen
                </button>
              </div>

              {/* Delete Status Message */}
              {deleteMessage && (
                <div style={{
                  padding: '0.75rem 1rem',
                  marginTop: '1rem',
                  borderRadius: '6px',
                  background: deleteMessage.type === 'success'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${deleteMessage.type === 'success' ? '#10b981' : '#ef4444'}`,
                  color: deleteMessage.type === 'success' ? '#10b981' : '#ef4444',
                  fontSize: '0.875rem'
                }}>
                  {deleteMessage.text}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Back to Dashboard */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
            style={{ padding: '0.75rem 2rem' }}
          >
            ← Zurück zum Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

import { useTranslation } from "react-i18next";
import { Button } from "@app/ui/Button";
import "@app/auth/ui/auth.css";
import { TextInput, PasswordInput } from "@mantine/core";

const PersonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
    <path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5L11 9l-1.5-1.5L8 9" />
    <circle cx="7.5" cy="15.5" r="5.5" />
  </svg>
);

// Theme-aware auth input colours (the --auth-* vars flip in dark mode via
// auth-theme.css). Exported so other auth screens (e.g. invite accept) render
// their Mantine inputs identically to login.
export const authInputStyles = {
  input: {
    backgroundColor: "var(--auth-input-bg)",
    color: "var(--auth-input-text)",
    borderColor: "var(--auth-input-border)",
    borderRadius: "0.75rem",
    transition: "all 0.2s ease",
    "&:focus, &:focus-within": {
      borderColor: "var(--c-primary)",
      boxShadow: "0 0 0 3px color-mix(in srgb, var(--c-primary) 18%, transparent)",
    },
  },
  label: {
    color: "var(--auth-label-text)",
    fontWeight: 500,
    marginBottom: "0.25rem",
    fontSize: "0.875rem",
  },
  section: {
    color: "var(--c-text-muted)",
  },
};

interface EmailPasswordFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  mfaCode?: string;
  setMfaCode?: (code: string) => void;
  showMfaField?: boolean;
  requiresMfa?: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitButtonText: string;
  showPasswordField?: boolean;
  fieldErrors?: {
    email?: string;
    password?: string;
    mfaCode?: string;
  };
}

export default function EmailPasswordForm({
  email,
  password,
  setEmail,
  setPassword,
  mfaCode = "",
  setMfaCode,
  showMfaField = false,
  requiresMfa = false,
  onSubmit,
  isSubmitting,
  submitButtonText,
  showPasswordField = true,
  fieldErrors = {},
}: EmailPasswordFormProps) {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-fields">
        <div className="auth-field">
          <TextInput
            id="email"
            label={t("login.username", "Username")}
            type="text"
            name="username"
            autoComplete="username"
            placeholder={t("login.enterUsername", "Enter username")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            leftSection={<PersonIcon />}
            classNames={{ label: "auth-label" }}
            styles={authInputStyles}
            autoFocus
          />
        </div>

        {showPasswordField && (
          <div className="auth-field">
            <PasswordInput
              id="password"
              label={t("login.password", "Password")}
              name="current-password"
              autoComplete="current-password"
              placeholder={t("login.enterPassword", "Enter your password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors.password}
              leftSection={<LockIcon />}
              classNames={{ label: "auth-label" }}
              styles={authInputStyles}
            />
          </div>
        )}
        {showMfaField && (
          <div className="auth-field">
            <TextInput
              id="mfaCode"
              label={t("login.mfaCode", "Authentication Code")}
              type="text"
              name="mfaCode"
              autoComplete="one-time-code"
              placeholder={t("login.enterMfaCode", "Enter 6-digit code")}
              value={mfaCode}
              inputMode="numeric"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMfaCode?.(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              pattern="[0-9]*"
              maxLength={6}
              minLength={6}
              error={fieldErrors.mfaCode}
              leftSection={<KeyIcon />}
              classNames={{ label: "auth-label" }}
              styles={authInputStyles}
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={
          isSubmitting ||
          !email ||
          (showPasswordField && !password) ||
          (requiresMfa && !mfaCode.trim())
        }
        fullWidth
        size="lg"
        fontSize="sm"
        loading={isSubmitting}
        className="auth-submit"
        accent="default"
      >
        {submitButtonText}
      </Button>
    </form>
  );
}

import { useState } from "react";
import { Alert, Stack, Text, Group, ActionIcon, Tooltip } from "@mantine/core";
import { useTranslation } from "react-i18next";

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--c-primary)" }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckMarkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#10b981" }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * First-time-setup notice showing the default admin credentials. Rendered
 * beneath the login form when the backend reports a fresh install.
 */
export default function AuthDefaultCredentials() {
  const { t } = useTranslation();
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  const copyToClipboard = (text: string, isUser: boolean) => {
    void navigator.clipboard.writeText(text);
    if (isUser) {
      setCopiedUser(true);
      setTimeout(() => setCopiedUser(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <Alert
      icon={<InfoIcon />}
      color="blue"
      variant="light"
      radius="lg"
      mt="xl"
      styles={{
        root: {
          border: "1px solid color-mix(in srgb, var(--c-primary) 25%, transparent)",
          backgroundColor: "color-mix(in srgb, var(--c-primary) 6%, transparent)",
          padding: "1rem 1.25rem",
        },
      }}
    >
      <Stack gap="xs">
        <Text size="sm" fw={600} style={{ color: "var(--c-text)" }}>
          {t("login.defaultCredentials", "Default Login Credentials")}
        </Text>
        <Group justify="space-between" wrap="nowrap">
          <Text size="sm" style={{ color: "var(--c-text-muted)" }}>
            <Text component="span" fw={600} style={{ color: "var(--c-text)" }}>
              {t("login.username", "Username")}:
            </Text>{" "}
            <code style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: "var(--c-surface-sunken)", color: "var(--c-text)" }}>
              admin
            </code>
          </Text>
          <Tooltip label={copiedUser ? t("common.copied", "Copied!") : t("common.copy", "Copy")}>
            <ActionIcon
              size="sm"
              variant="subtle"
              color={copiedUser ? "teal" : "gray"}
              onClick={() => copyToClipboard("admin", true)}
              aria-label="Copy username"
            >
              {copiedUser ? <CheckMarkIcon /> : <CopyIcon />}
            </ActionIcon>
          </Tooltip>
        </Group>

        <Group justify="space-between" wrap="nowrap">
          <Text size="sm" style={{ color: "var(--c-text-muted)" }}>
            <Text component="span" fw={600} style={{ color: "var(--c-text)" }}>
              {t("login.password", "Password")}:
            </Text>{" "}
            <code style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: "var(--c-surface-sunken)", color: "var(--c-text)" }}>
              stirling
            </code>
          </Text>
          <Tooltip label={copiedPass ? t("common.copied", "Copied!") : t("common.copy", "Copy")}>
            <ActionIcon
              size="sm"
              variant="subtle"
              color={copiedPass ? "teal" : "gray"}
              onClick={() => copyToClipboard("stirling", false)}
              aria-label="Copy password"
            >
              {copiedPass ? <CheckMarkIcon /> : <CopyIcon />}
            </ActionIcon>
          </Tooltip>
        </Group>

        <Text
          size="xs"
          mt="4px"
          style={{ color: "var(--c-text-subtle)", lineHeight: 1.4 }}
        >
          {t(
            "login.changePasswordWarning",
            "Please change your password after logging in for the first time",
          )}
        </Text>
      </Stack>
    </Alert>
  );
}

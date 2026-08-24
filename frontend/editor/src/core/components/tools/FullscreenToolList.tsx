import { useMemo } from "react";
import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  ToolRegistryEntry,
  getSubcategoryLabel,
  getSubcategoryColor,
  getSubcategoryIcon,
} from "@app/data/toolsTaxonomy";
import { ToolId } from "@app/types/toolId";
import { useToolSections } from "@app/hooks/useToolSections";
import NoToolsFound from "@app/components/tools/shared/NoToolsFound";
import { useToolWorkflow } from "@app/contexts/ToolWorkflowContext";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import LocalIcon from "@app/components/shared/LocalIcon";
import Badge from "@app/components/shared/Badge";
import "@app/components/tools/ToolPanel.css";
import DetailedToolItem from "@app/components/tools/fullscreen/DetailedToolItem";
import CompactToolItem from "@app/components/tools/fullscreen/CompactToolItem";
import { useFavoriteToolItems } from "@app/hooks/tools/useFavoriteToolItems";

interface FullscreenToolListProps {
  filteredTools: Array<{
    item: [ToolId, ToolRegistryEntry];
    matchedText?: string;
  }>;
  searchQuery: string;
  showDescriptions: boolean;
  selectedToolKey: string | null;
  matchedTextMap: Map<string, string>;
  onSelect: (id: ToolId) => void;
  activeCategory?: string;
}

const QUICK_ACTIONS = [
  {
    id: "merge",
    name: "Mesclar",
    desc: "Unir vários PDFs em um só arquivo",
    icon: "layers-rounded",
    accent: "#6366f1",
  },
  {
    id: "compress",
    name: "Comprimir",
    desc: "Otimizar e reduzir tamanho do PDF",
    icon: "compress-rounded",
    accent: "#f59e0b",
  },
  {
    id: "convert",
    name: "Converter",
    desc: "PDF para Word, imagens e outros",
    icon: "sync-alt-rounded",
    accent: "#0ea5e9",
  },
  {
    id: "certSign",
    name: "Assinar",
    desc: "Assinatura digital e carimbo de tempo",
    icon: "draw-rounded",
    accent: "#10b981",
  },
  {
    id: "pdfTextEditor",
    name: "Editar Texto",
    desc: "Edição direta no documento PDF",
    icon: "edit-rounded",
    accent: "#ec4899",
  },
];

const FullscreenToolList = ({
  filteredTools,
  searchQuery,
  showDescriptions,
  selectedToolKey,
  matchedTextMap: _matchedTextMap,
  onSelect,
  activeCategory = "all",
}: FullscreenToolListProps) => {
  const { t } = useTranslation();
  const { toolRegistry, favoriteTools } = useToolWorkflow();

  const { sections, searchGroups } = useToolSections(
    filteredTools,
    searchQuery,
  );

  const tooltipPortalTarget =
    typeof document !== "undefined" ? document.body : undefined;

  const favoriteToolItems = useFavoriteToolItems(favoriteTools, toolRegistry);

  const quickSection = useMemo(
    () => sections.find((section) => section.key === "quick"),
    [sections],
  );
  const recommendedItems = useMemo(() => {
    if (!quickSection)
      return [] as Array<{ id: ToolId; tool: ToolRegistryEntry }>;
    const items: Array<{ id: ToolId; tool: ToolRegistryEntry }> = [];
    quickSection.subcategories.forEach((sc) =>
      sc.tools.forEach((t) => items.push(t)),
    );
    return items;
  }, [quickSection]);

  const isSearching = searchQuery.trim().length > 0;

  const subcategoryGroups = useMemo(() => {
    if (isSearching) {
      return searchGroups;
    }
    const allSection = sections.find((section) => section.key === "all");
    return allSection ? allSection.subcategories : [];
  }, [searchGroups, sections, isSearching]);

  // Filter based on activeCategory
  const showFavorites =
    !isSearching &&
    (activeCategory === "all" || activeCategory === "favorites") &&
    favoriteToolItems.length > 0;

  const showRecommended =
    !isSearching &&
    (activeCategory === "all" || activeCategory === "recommended") &&
    recommendedItems.length > 0;

  const filteredGroups = useMemo(() => {
    if (activeCategory === "favorites" || activeCategory === "recommended") {
      return [];
    }
    if (activeCategory === "all" || isSearching) {
      return subcategoryGroups;
    }
    return subcategoryGroups.filter(
      (group) => group.subcategoryId === activeCategory,
    );
  }, [activeCategory, subcategoryGroups, isSearching]);

  const showQuickHero =
    !isSearching && activeCategory === "all";

  if (
    filteredGroups.length === 0 &&
    !showFavorites &&
    !showRecommended &&
    !showQuickHero
  ) {
    return (
      <div className="tool-panel__fullscreen-empty">
        <NoToolsFound />
        <Text size="sm" c="dimmed">
          {t(
            "toolPanel.fullscreen.noResults",
            "Try adjusting your search or toggle descriptions to find what you need.",
          )}
        </Text>
      </div>
    );
  }

  const containerClass = showDescriptions
    ? "tool-panel__fullscreen-groups tool-panel__fullscreen-groups--detailed"
    : "tool-panel__fullscreen-groups tool-panel__fullscreen-groups--compact";

  // Helper function to render a tool item
  const renderToolItem = (id: ToolId, tool: ToolRegistryEntry) => {
    const isSelected = selectedToolKey === id;

    const handleClick = () => {
      if (!tool.component && !tool.link && id !== "read" && id !== "multiTool")
        return;
      if (tool.link) {
        window.open(tool.link, "_blank", "noopener,noreferrer");
        return;
      }
      onSelect(id as ToolId);
    };

    if (showDescriptions) {
      return (
        <DetailedToolItem
          key={id}
          id={id}
          tool={tool}
          isSelected={isSelected}
          onClick={handleClick}
        />
      );
    }

    return (
      <CompactToolItem
        key={id}
        id={id}
        tool={tool}
        isSelected={isSelected}
        onClick={handleClick}
        tooltipPortalTarget={tooltipPortalTarget}
      />
    );
  };

  return (
    <div className="tool-panel__fullscreen-wrapper">
      {/* Quick Actions Hero Banner */}
      {showQuickHero && (
        <div className="tool-panel__quick-actions-hero">
          <div className="tool-panel__quick-actions-header">
            <div className="tool-panel__quick-actions-title">
              <FlashOnRoundedIcon sx={{ fontSize: "1.2rem", color: "#f59e0b" }} />
              <Text size="sm" fw={700} tt="uppercase" lts={0.8}>
                {t("toolPicker.quickAccess", "Ações Rápidas Populares")}
              </Text>
            </div>
            <Text size="xs" c="dimmed">
              Acesse as ferramentas essenciais com um clique
            </Text>
          </div>
          <div className="tool-panel__quick-actions-grid">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                className="tool-panel__quick-card"
                style={{ "--quick-accent": action.accent } as React.CSSProperties}
                onClick={() => onSelect(action.id as ToolId)}
              >
                <div className="tool-panel__quick-card-icon" style={{ backgroundColor: action.accent }}>
                  <LocalIcon icon={action.icon} width={22} height={22} />
                </div>
                <div className="tool-panel__quick-card-info">
                  <span className="tool-panel__quick-card-name">{action.name}</span>
                  <span className="tool-panel__quick-card-desc">{action.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={containerClass}>
        {showFavorites && (
          <section
            className="tool-panel__fullscreen-group tool-panel__fullscreen-group--special"
            style={{
              borderColor: "var(--fullscreen-border-favorites)",
              "--group-accent-color": "var(--special-color-favorites)",
            } as React.CSSProperties}
          >
            <header className="tool-panel__fullscreen-section-header">
              <div className="tool-panel__fullscreen-section-title">
                <span
                  className="tool-panel__fullscreen-section-icon"
                  style={{
                    color: "var(--special-color-favorites)",
                  }}
                  aria-hidden
                >
                  <StarRoundedIcon />
                </span>
                <Text size="sm" fw={600} tt="uppercase" lts={0.5} c="dimmed">
                  {t("toolPanel.fullscreen.favorites", "Favoritos")}
                </Text>
              </div>
              <Badge
                size="sm"
                variant="colored"
                color="var(--special-color-favorites)"
              >
                {favoriteToolItems.length}
              </Badge>
            </header>
            {showDescriptions ? (
              <div className="tool-panel__fullscreen-grid tool-panel__fullscreen-grid--detailed">
                {favoriteToolItems.map(
                  (item) => item && renderToolItem(item.id, item.tool),
                )}
              </div>
            ) : (
              <div className="tool-panel__fullscreen-list">
                {favoriteToolItems.map(
                  (item) => item && renderToolItem(item.id, item.tool),
                )}
              </div>
            )}
          </section>
        )}

        {showRecommended && (
          <section
            className="tool-panel__fullscreen-group tool-panel__fullscreen-group--special"
            style={{
              borderColor: "var(--fullscreen-border-recommended)",
              "--group-accent-color": "var(--special-color-recommended)",
            } as React.CSSProperties}
          >
            <header className="tool-panel__fullscreen-section-header">
              <div className="tool-panel__fullscreen-section-title">
                <span
                  className="tool-panel__fullscreen-section-icon"
                  style={{
                    color: "var(--special-color-recommended)",
                  }}
                  aria-hidden
                >
                  <ThumbUpRoundedIcon />
                </span>
                <Text size="sm" fw={600} tt="uppercase" lts={0.5} c="dimmed">
                  {t("toolPanel.fullscreen.recommended", "Recomendadas")}
                </Text>
              </div>
              <Badge
                size="sm"
                variant="colored"
                color="var(--special-color-recommended)"
              >
                {recommendedItems.length}
              </Badge>
            </header>
            {showDescriptions ? (
              <div className="tool-panel__fullscreen-grid tool-panel__fullscreen-grid--detailed">
                {recommendedItems.map((item) =>
                  renderToolItem(item.id, item.tool),
                )}
              </div>
            ) : (
              <div className="tool-panel__fullscreen-list">
                {recommendedItems.map((item) =>
                  renderToolItem(item.id, item.tool),
                )}
              </div>
            )}
          </section>
        )}

        {filteredGroups.map(({ subcategoryId, tools }) => {
          const categoryColor = getSubcategoryColor(subcategoryId);

          return (
            <section
              key={subcategoryId}
              className={`tool-panel__fullscreen-group ${showDescriptions ? "tool-panel__fullscreen-group--detailed" : "tool-panel__fullscreen-group--compact"}`}
              style={{
                borderColor: `color-mix(in srgb, ${categoryColor} 25%, var(--fullscreen-border-subtle-65))`,
                "--group-accent-color": categoryColor,
              } as React.CSSProperties}
            >
              <header className="tool-panel__fullscreen-section-header">
                <div className="tool-panel__fullscreen-section-title">
                  <span
                    className="tool-panel__fullscreen-section-icon"
                    style={{
                      color: categoryColor,
                    }}
                    aria-hidden
                  >
                    {getSubcategoryIcon(subcategoryId)}
                  </span>
                  <Text
                    size="sm"
                    fw={700}
                    tt="uppercase"
                    lts={0.6}
                    style={{
                      color: categoryColor,
                    }}
                  >
                    {getSubcategoryLabel(t, subcategoryId)}
                  </Text>
                </div>
                <Badge size="sm" variant="colored" color={categoryColor}>
                  {tools.length}
                </Badge>
              </header>

              {showDescriptions ? (
                <div className="tool-panel__fullscreen-grid tool-panel__fullscreen-grid--detailed">
                  {tools.map(({ id, tool }) =>
                    renderToolItem(id as ToolId, tool),
                  )}
                </div>
              ) : (
                <div className="tool-panel__fullscreen-list">
                  {tools.map(({ id, tool }) =>
                    renderToolItem(id as ToolId, tool),
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default FullscreenToolList;

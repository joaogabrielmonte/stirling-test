import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ScrollArea, Switch } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ToolSearch from "@app/components/tools/toolPicker/ToolSearch";
import FullscreenToolList from "@app/components/tools/FullscreenToolList";
import { ToolRegistryEntry } from "@app/data/toolsTaxonomy";
import { ToolId } from "@app/types/toolId";
import { useFocusTrap } from "@app/hooks/useFocusTrap";
import LocalIcon from "@app/components/shared/LocalIcon";
import "@app/components/tools/ToolPanel.css";
import { ToolPanelGeometry } from "@app/hooks/tools/useToolPanelGeometry";

interface FullscreenToolSurfaceProps {
  searchQuery: string;
  toolRegistry: Partial<Record<ToolId, ToolRegistryEntry>>;
  filteredTools: Array<{
    item: [ToolId, ToolRegistryEntry];
    matchedText?: string;
  }>;
  selectedToolKey: string | null;
  showDescriptions: boolean;
  matchedTextMap: Map<string, string>;
  onSearchChange: (value: string) => void;
  onSelect: (id: ToolId) => void;
  onToggleDescriptions: () => void;
  onExitFullscreenMode: () => void;
  geometry: ToolPanelGeometry | null;
}

export const CATEGORY_FILTERS = [
  {
    id: "all",
    labelKey: "toolPicker.allTools",
    defaultLabel: "Todas",
    icon: "dashboard-rounded",
  },
  {
    id: "recommended",
    labelKey: "toolPicker.recommended",
    defaultLabel: "Recomendadas",
    icon: "thumb-up-rounded",
  },
  {
    id: "favorites",
    labelKey: "toolPicker.favorites",
    defaultLabel: "Favoritos",
    icon: "star-rounded",
  },
  {
    id: "signing",
    labelKey: "toolPicker.subcategories.signing",
    defaultLabel: "Assinatura",
    icon: "draw-rounded",
  },
  {
    id: "documentSecurity",
    labelKey: "toolPicker.subcategories.documentSecurity",
    defaultLabel: "Segurança",
    icon: "security-rounded",
  },
  {
    id: "pageFormatting",
    labelKey: "toolPicker.subcategories.pageFormatting",
    defaultLabel: "Formatação",
    icon: "view-agenda-rounded",
  },
  {
    id: "removal",
    labelKey: "toolPicker.subcategories.removal",
    defaultLabel: "Remoção",
    icon: "delete-sweep-rounded",
  },
  {
    id: "extraction",
    labelKey: "toolPicker.subcategories.extraction",
    defaultLabel: "Extração",
    icon: "file-download-rounded",
  },
  {
    id: "automation",
    labelKey: "toolPicker.subcategories.automation",
    defaultLabel: "Automação",
    icon: "smart-toy-rounded",
  },
  {
    id: "general",
    labelKey: "toolPicker.subcategories.general",
    defaultLabel: "Geral",
    icon: "build-rounded",
  },
  {
    id: "advancedFormatting",
    labelKey: "toolPicker.subcategories.advancedFormatting",
    defaultLabel: "Avançado",
    icon: "tune-rounded",
  },
  {
    id: "developerTools",
    labelKey: "toolPicker.subcategories.developerTools",
    defaultLabel: "Desenvolvedor",
    icon: "code-rounded",
  },
];

const FullscreenToolSurface = ({
  searchQuery,
  toolRegistry,
  filteredTools,
  selectedToolKey,
  showDescriptions,
  matchedTextMap,
  onSearchChange,
  onSelect,
  onToggleDescriptions,
  onExitFullscreenMode: _onExitFullscreenMode,
  geometry,
}: FullscreenToolSurfaceProps) => {
  const { t } = useTranslation();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Enable focus trap when surface is active
  useFocusTrap(surfaceRef, true);

  if (!geometry) return null;

  const style = {
    left: `${geometry.left}px`,
    top: `${geometry.top}px`,
    width: `${geometry.width}px`,
    height: `${geometry.height}px`,
  };

  const surface = (
    <div
      className="tool-panel__fullscreen-surface"
      style={style}
      role="region"
      aria-label={t(
        "toolPanel.fullscreen.heading",
        "All tools (fullscreen view)",
      )}
      data-tour="tool-panel"
    >
      <div ref={surfaceRef} className="tool-panel__fullscreen-surface-inner">
        <div className="tool-panel__fullscreen-controls">
          <div className="tool-panel__fullscreen-controls-top">
            <ToolSearch
              value={searchQuery}
              onChange={(val) => {
                onSearchChange(val);
                if (val.trim()) setActiveCategory("all");
              }}
              toolRegistry={toolRegistry}
              mode="filter"
              autoFocus
            />
            <Switch
              checked={showDescriptions}
              onChange={() => onToggleDescriptions()}
              size="md"
              labelPosition="left"
              label={t("toolPanel.fullscreen.showDetails", "Mostrar Detalhes")}
            />
          </div>

          {searchQuery.trim().length === 0 && (
            <div className="tool-panel__category-filter-bar">
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`tool-panel__category-pill ${isActive ? "tool-panel__category-pill--active" : ""}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <LocalIcon icon={cat.icon} width={15} height={15} />
                    <span>{t(cat.labelKey, cat.defaultLabel)}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="tool-panel__fullscreen-body">
          <ScrollArea
            className="tool-panel__fullscreen-scroll"
            offsetScrollbars
          >
            <FullscreenToolList
              filteredTools={filteredTools}
              searchQuery={searchQuery}
              showDescriptions={showDescriptions}
              selectedToolKey={selectedToolKey}
              matchedTextMap={matchedTextMap}
              onSelect={onSelect}
              activeCategory={activeCategory}
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return surface;
  return createPortal(surface, document.body);
};

export default FullscreenToolSurface;

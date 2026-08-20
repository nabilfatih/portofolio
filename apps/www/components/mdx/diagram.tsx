"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { getThemeAppearance } from "@repo/design-system/lib/theme/registry";
import { cn } from "@repo/design-system/lib/utils";
import { Data, Effect, Fiber } from "effect";
import type { MermaidConfig } from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

class DiagramRenderError extends Data.TaggedError("DiagramRenderError")<{
  readonly cause: unknown;
}> {}

let diagramRenderSequence = 0;

function acquireRenderContainer(componentId: string) {
  return Effect.try({
    catch: (cause) => new DiagramRenderError({ cause }),
    try: () => {
      const container = document.createElement("div");
      const sequence = diagramRenderSequence;
      diagramRenderSequence += 1;

      container.ariaHidden = "true";
      container.style.left = "-10000px";
      container.style.pointerEvents = "none";
      container.style.position = "fixed";
      container.style.visibility = "hidden";
      container.style.width = "1024px";
      document.body.append(container);

      return {
        container,
        renderId: `diagram-${componentId}-${sequence}`,
      };
    },
  });
}

const renderDiagram = Effect.fn("portfolio.diagram.render")(function* (
  chart: string,
  componentId: string,
  config: MermaidConfig
) {
  const mermaidModule = yield* Effect.tryPromise({
    catch: (cause) => new DiagramRenderError({ cause }),
    try: () => import("mermaid"),
  });

  yield* Effect.try({
    catch: (cause) => new DiagramRenderError({ cause }),
    try: () => mermaidModule.default.initialize(config),
  });

  return yield* Effect.acquireUseRelease(
    acquireRenderContainer(componentId),
    ({ container, renderId }) =>
      Effect.tryPromise({
        catch: (cause) => new DiagramRenderError({ cause }),
        try: () => mermaidModule.default.render(renderId, chart, container),
      }),
    ({ container }) => Effect.sync(() => container.remove())
  );
});

interface DiagramState {
  error: boolean;
  key: string;
  svg: string;
}

export interface ArchitectureDiagramProps {
  chart: string;
  description: string;
  title: string;
}

function getThemeConfig(appearance: "dark" | "light"): MermaidConfig {
  return {
    flowchart: {
      nodeSpacing: 24,
      padding: 8,
      rankSpacing: 32,
    },
    fontFamily: "inherit",
    securityLevel: "strict",
    startOnLoad: false,
    suppressErrorRendering: true,
    theme: "base",
    themeCSS: `
      .node rect, .node circle, .node ellipse, .node polygon, .node path {
        fill: var(--muted) !important;
        stroke: var(--border) !important;
      }
      .nodeLabel, .label, text {
        color: var(--foreground) !important;
        fill: var(--foreground) !important;
      }
      .flowchart-link, .edge-thickness-normal, .edge-thickness-thick {
        stroke: var(--muted-foreground) !important;
      }
      .marker {
        fill: var(--muted-foreground) !important;
        stroke: var(--muted-foreground) !important;
      }
      .edgeLabel {
        background-color: var(--background) !important;
        color: var(--foreground) !important;
      }
      .edgeLabel rect {
        fill: var(--background) !important;
        opacity: 0.92 !important;
      }
    `,
    themeVariables: {
      darkMode: appearance === "dark",
    },
  };
}

export function ArchitectureDiagram({
  chart,
  description,
  title,
}: ArchitectureDiagramProps) {
  const componentId = useId().replaceAll(":", "");
  const descriptionId = `diagram-description-${componentId}`;
  const titleId = `diagram-title-${componentId}`;
  const { resolvedTheme } = useTheme();
  const appearance = getThemeAppearance(resolvedTheme);
  const renderKey = `${componentId}-${appearance}-${chart}`;
  const lastValidSvg = useRef("");
  const [state, setState] = useState<DiagramState>({
    error: false,
    key: "",
    svg: "",
  });

  useEffect(() => {
    const fiber = Effect.runFork(
      renderDiagram(chart, componentId, getThemeConfig(appearance)).pipe(
        Effect.matchEffect({
          onFailure: () =>
            Effect.sync(() => ({
              error: !lastValidSvg.current,
              key: renderKey,
              svg: lastValidSvg.current,
            })),
          onSuccess: ({ svg }) =>
            Effect.sync(() => {
              lastValidSvg.current = svg;

              return { error: false, key: renderKey, svg };
            }),
        }),
        Effect.tap((nextState) => Effect.sync(() => setState(nextState)))
      )
    );

    return () => {
      Effect.runFork(Fiber.interrupt(fiber));
    };
  }, [appearance, chart, componentId, renderKey]);

  const isCurrent = state.key === renderKey;
  const isLoading = !(isCurrent || state.svg);

  return (
    <Card
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className="not-prose my-8 bg-muted/40 shadow-none ring-0"
      role="figure"
    >
      <CardHeader>
        <CardTitle className="font-normal text-sm" id={titleId}>
          {title}
        </CardTitle>
        <CardDescription
          className="text-foreground/80 leading-relaxed"
          id={descriptionId}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid min-h-72 place-items-center overflow-x-auto">
        {isLoading ? (
          <div
            aria-label={`Loading ${title}`}
            className="h-52 w-full animate-pulse rounded-xl bg-muted"
            role="status"
          />
        ) : null}
        {isCurrent && state.error ? (
          <pre className="w-full overflow-x-auto whitespace-pre-wrap rounded-xl bg-background/70 p-4 text-sm leading-relaxed">
            <code>{chart}</code>
          </pre>
        ) : null}
        {state.svg ? (
          <div
            aria-label={title}
            className={cn(
              "w-full text-base sm:min-w-xl [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full",
              !isCurrent && "opacity-70"
            )}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Mermaid returns sanitized SVG in strict security mode.
            dangerouslySetInnerHTML={{ __html: state.svg }}
            role="img"
          />
        ) : null}
      </CardContent>
    </Card>
  );
}

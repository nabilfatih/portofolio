import { SOCIAL_THEME_COLORS as colors } from "@repo/design-system/lib/theme/social";
import { Effect, FileSystem, Path, Schema } from "effect";
import { Base64 } from "effect/encoding";
import type { CSSProperties } from "react";
import { ImageResponse } from "takumi-js/response";
import { SOCIAL_IMAGE_SIZE, type SocialCard } from "@/lib/social";

/** Takumi could not render a social image. */
class SocialImageError extends Schema.TaggedError<SocialImageError>()(
  "SocialImageError",
  {
    cause: Schema.Unknown,
    message: Schema.String,
  }
) {}

const shellStyle = {
  backgroundColor: colors.background,
  backgroundImage: `linear-gradient(to bottom right, ${colors.secondary}, transparent)`,
  color: colors.foreground,
  display: "flex",
  fontFamily: "Geist",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  width: "100%",
} satisfies CSSProperties;

const innerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between",
  padding: 60,
  position: "relative",
  width: "100%",
} satisfies CSSProperties;

function OgImage({ card, logo }: { card: SocialCard; logo: string }) {
  return (
    <div style={shellStyle}>
      <div style={innerStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            marginBottom: 40,
            textWrap: "pretty",
          }}
        >
          <div
            style={{
              color: colors.foreground,
              display: "flex",
              fontSize: 72,
              fontWeight: 600,
              lineClamp: 3,
              lineHeight: 1.1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {card.title}
          </div>
          <div
            style={{
              color: colors.foreground,
              display: "flex",
              fontSize: 36,
              fontWeight: 400,
              lineClamp: 2,
              lineHeight: 1.4,
              maxWidth: "95%",
              opacity: 0.8,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {card.description}
          </div>
        </div>

        <div style={{ alignItems: "center", display: "flex", gap: 28 }}>
          <div
            style={{
              backgroundImage: `url(${logo})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: 999,
              display: "flex",
              height: 48,
              width: 48,
            }}
          />
          <div
            style={{
              color: colors.foreground,
              display: "flex",
              fontSize: 32,
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            nabilfatih.com
          </div>
          <div style={{ display: "flex", flexGrow: 1 }} />
          <div
            style={{
              backgroundColor: colors.primary,
              borderRadius: 2,
              display: "flex",
              height: 4,
              width: 60,
            }}
          />
          <div
            style={{
              color: colors.primary,
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              opacity: 0.8,
            }}
          >
            NABIL FATIH
          </div>
        </div>
      </div>
    </div>
  );
}

/** Reads the logo as the data URL that the image embeds. */
const readLogoDataUrl = Effect.fn("www.og.readLogo")(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const logo = yield* fileSystem.readFile(
    path.join(process.cwd(), "public", "logo.png")
  );

  return `data:image/png;base64,${Base64.encode(logo)}`;
});

/** Renders one route-aware social image with Nakafa's shared composition. */
export const renderSocialImage = Effect.fn("www.og.render")(function* (
  card: SocialCard
) {
  const logo = yield* readLogoDataUrl();
  const image = new ImageResponse(<OgImage card={card} logo={logo} />, {
    ...SOCIAL_IMAGE_SIZE,
  });
  const bytes = yield* Effect.tryPromise({
    catch: (cause) =>
      new SocialImageError({
        cause,
        message: `Could not render ${card.title}.`,
      }),
    try: () => image.arrayBuffer(),
  });

  return new Uint8Array(bytes);
});

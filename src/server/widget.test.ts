import { describe, expect, it } from "vitest";
import { aiLabel, widgetScript, type WidgetConfig } from "./widget.js";

describe("aiLabel", () => {
  it("says it is an AI in the mascot's own language", () => {
    expect(aiLabel("ai", "en")).toBe("AI assistant");
    expect(aiLabel("ai", "nl")).toBe("AI-assistent");
    expect(aiLabel("ai", "de")).toBe("KI-Assistent");
    expect(aiLabel("ai", "fr")).toBe("Assistant IA");
    expect(aiLabel("ai", "es")).toBe("Asistente de IA");
    expect(aiLabel("ai", "it")).toBe("Assistente IA");
  });

  it("reads a regional tag by its language, and falls back to English", () => {
    expect(aiLabel("ai", "nl-BE")).toBe("AI-assistent");
    expect(aiLabel("ai", "DE_at")).toBe("KI-Assistent");
    expect(aiLabel("ai", "pt")).toBe("AI assistant");
    expect(aiLabel("ai", "")).toBe("AI assistant");
  });

  it("is empty when the AI is never called", () => {
    expect(aiLabel("human", "nl")).toBe("");
  });
});

describe("widgetScript", () => {
  const config: WidgetConfig = {
    origin: "https://example.test",
    key: "k",
    name: "Mo",
    accent: "#4f46e5",
    avatarUrl: null,
    greeting: "Hi",
    tagline: "",
    suggested: [],
    mascotId: "m",
    ink: "#ffffff",
    charLaunch: "",
    charHead: "",
    aiLabel: "AI-assistent",
  };

  it("hands the label to the script", () => {
    expect(widgetScript(config)).toContain('"aiLabel":"AI-assistent"');
  });
});

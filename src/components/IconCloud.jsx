import React, { useRef, useEffect } from "react";
import { Cloud } from "react-icon-cloud";
import { useIcons } from "./useIcons";

const defaultSlugs = [
  "html5",
  "css3",
  "javascript",
  "react",
  "nodedotjs",
  "mongodb",
  "typescript",
  "vuedotjs",
  "angular",
  "git",
  "github",
  "gitlab",
  "python",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "flutter",
  "docker",
  "kubernetes",
  "linux",
  "macos",
  "android",
  "ios",
  "postgresql",
  "mysql",
  "redis",
  "elasticsearch",
  "webpack",
  "babel",
  "jest",
  "mocha",
  "selenium",
  "puppeteer",
  "express",
  "nextdotjs",
  "gatsby",
  "redux",
  "prisma",
  "firebase",
  "figma",
  "dart",
  "nginx",
  "vercel",
  "netlify",
  "jira",
  "androidstudio",
  "sonarqube",
  "testinglibrary",
  "cypress",
  "jquery",
  "semanticui",
  "bootstrap",
  "tailwindcss",
  "sass",
  "less",
  "stylus",
  "webflow",
  "wix",
];

export function IconCloud({
  containerProps,
  canvasWidth = 560,
  iconSize = 40,
  freezeActive = false,
  clickToFront = true,
  tooltipDelay = 0,
}) {
  const { icons, loading, error } = useIcons(defaultSlugs, iconSize);
  const cloudRef = useRef(null);

  useEffect(() => {
    if (!cloudRef.current || !window.TagCanvas) return;

    let mouseX = 0;
    let mouseY = 0;
    let isMouseInside = false;

    const handleMouseMove = (e) => {
      if (!cloudRef.current || !isMouseInside) return;

      const rect = cloudRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      window.TagCanvas?.SetSpeed("myCanvas", [mouseX * 0.8, mouseY * 0.8]);
    };

    const handleMouseEnter = () => (isMouseInside = true);
    const handleMouseLeave = () => {
      isMouseInside = false;
      window.TagCanvas?.SetSpeed("myCanvas", [0, 0]);
    };

    const container = cloudRef.current;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (error) {
    return (
      <div
        style={{
          padding: "1rem",
          color: "#EF4444",
          background: "#FEF2F2",
          borderRadius: "6px",
        }}
      >
        Error loading icons: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="animate-spin"
          style={{
            borderRadius: "50%",
            height: "32px",
            width: "32px",
            borderBottomWidth: "2px",
            borderColor: "black",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={cloudRef}
      {...containerProps}
      className={`px ${containerProps?.className || ""}`}
    >
      <Cloud
        id="myCanvas"
        containerProps={{
          style: {
            width: "100%",
            height: "auto",
            maxWidth: canvasWidth,
            aspectRatio: "16 / 9",
          },
        }}
        options={{
          freezeActive,
          clickToFront,
          tooltipDelay,
          initial: [0.1, -0.1],
          wheelZoom: false,
          fadeIn: 1000,
          shape: "sphere",
          noSelect: true,
          shuffleTags: true,
          reverse: true,
          depth: 1,
          imageScale: 2,
          maxSpeed: 0.05,
          minSpeed: 0.02,
          decel: 0.95,
          interval: 20,
          radiusX: 0.8,
          radiusY: 0.8,
          radiusZ: 0.8,
          stretchX: 1.1,
          stretchY: 1.1,
        }}
      >
        {icons}
      </Cloud>
    </div>
  );
}

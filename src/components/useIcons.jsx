import { useState, useEffect } from "react";
import { renderSimpleIcon, fetchSimpleIcons } from "react-icon-cloud";

export const useIcons = (slugs, iconSize = 40) => {
  const [icons, setIcons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchSimpleIcons({ slugs });

        if (!result?.simpleIcons) {
          throw new Error("No icons found");
        }

        const renderedIcons = Object.values(result.simpleIcons).map((icon) =>
          renderSimpleIcon({
            icon,
            size: iconSize,
            aProps: {
              onClick: (e) => e.preventDefault(),
              "aria-label": `${icon.title} icon`,
              style: {
                cursor: "pointer",
                margin: "0.25rem",
                transition: "all 0.2s ease-in-out",
              },
              onMouseOver: (e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              },
              onMouseOut: (e) => {
                e.currentTarget.style.transform = "scale(1)";
              },
            },
          })
        );

        setIcons(renderedIcons);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch icons");
      } finally {
        setLoading(false);
      }
    };

    fetchIcons();
  }, [slugs, iconSize]);

  return { icons, loading, error };
};

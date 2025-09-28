"use client";

import React, { useEffect, useState } from "react";

export default function DebugTheme() {
  const Box = ({ name, varName }: { name: string; varName: string }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
      if (typeof window !== "undefined") {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue(varName);
        setValue(cssValue.trim());
      }
    }, [varName]);

    return (
      <div
        className="p-4 rounded-md border border-border mb-3"
        style={{ backgroundColor: `hsl(var(${varName}))` }}
      >
        <div className="text-sm">
          #{name}: <code>{value}</code>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-4 bg-background text-foreground">
      <Box name="background" varName="--background" />
      <Box name="foreground" varName="--foreground" />
      <Box name="input" varName="--input" />
      <Box name="border" varName="--border" />
    </div>
  );
}

"use client";

import React from "react";

type HtmlRendererProps = {
  html: string;
  className?: string;
};

export default function HtmlRenderer({ html, className }: HtmlRendererProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

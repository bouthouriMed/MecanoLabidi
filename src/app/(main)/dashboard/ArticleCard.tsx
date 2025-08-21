"use client";
import React from "react";
import {
  ArticleCardWrapper,
  ArticleImage,
  ArticleContent,
  ArticleTitle,
  ArticleDescription,
  ArticleMeta,
} from "./dashboard.styles";

type ArticleCardProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  source: string;
  publishedAt: string;
};

export default function ArticleCard({
  title,
  description,
  url,
  image,
  source,
  publishedAt,
}: ArticleCardProps) {
  return (
    <ArticleCardWrapper href={url} target="_blank" rel="noopener noreferrer">
      {image && <ArticleImage src={image} alt={title} />}
      <ArticleContent>
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleDescription>{description}</ArticleDescription>
        <ArticleMeta>
          <span>{source}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </ArticleMeta>
      </ArticleContent>
    </ArticleCardWrapper>
  );
}

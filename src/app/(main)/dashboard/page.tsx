"use client";
import React, { useEffect, useState } from "react";
import { DashboardContainer, Grid, Heading } from "./dashboard.styles";
import ArticleCard from "./ArticleCard";

type Article = {
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  publishedAt: string;
};

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((res) => setArticles(res.articles))
      .catch(console.error);
  }, []);

  return (
    <DashboardContainer>
      <Heading>Actualités Mécanique & Diagnostic</Heading>
      <Grid>
        {articles.map((a, idx) => (
          <ArticleCard key={idx} {...a} />
        ))}
      </Grid>
    </DashboardContainer>
  );
}

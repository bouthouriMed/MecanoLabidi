import styled from "styled-components";

/* Dashboard Layout Styles */
export const DashboardContainer = styled.div`
  padding: 20px;
`;

export const Heading = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #222;
`;

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

/* Article Card Styles */
export const ArticleCardWrapper = styled.a`
  display: block;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const ArticleContent = styled.div`
  padding: 15px;
`;

export const ArticleTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
`;

export const ArticleDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 10px;
`;

export const ArticleMeta = styled.div`
  font-size: 0.8rem;
  color: #888;
  display: flex;
  justify-content: space-between;
`;

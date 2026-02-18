import React from 'react';

export interface URSItem {
  id: string;
  category: string;
  requirement: string;
  priority: 'High' | 'Medium' | 'Low';
  rationale: string;
}

export interface URSResponse {
  projectName: string;
  items: URSItem[];
  summary: string;
}

export enum AppView {
  HOME = 'HOME',
  BUILDER = 'BUILDER',
  BLOG = 'BLOG',
  BLOG_ARTICLE = 'BLOG_ARTICLE'
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string;
}

export interface ServicePillar {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
}
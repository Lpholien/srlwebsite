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
  BUILDER = 'BUILDER'
}

export interface ServicePillar {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
}
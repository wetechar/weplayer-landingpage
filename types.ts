import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl?: string;
}

export interface VerticalItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PartnerLogo {
  name: string;
  url: string; // Placeholder URL
  imageUrl?: string;
  subtitle?: string;
  description?: string;
}
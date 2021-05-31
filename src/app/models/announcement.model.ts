import { Section } from "./section.model";

export interface Announcement {
  section: Section;
  title: string;
  description: string;
  date: string
}

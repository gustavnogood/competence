import { RawNodeDatum } from "react-d3-tree";

export interface Roadmap {
    id: string;
    name: string;
    description: string;
    roles: Role[];
}

export interface Role {
    roleId: string;
    name: string;
    description: string;
    skills: Skill[];
}

export interface Skill {
    skillId: string;
    name: string;
    description: string;
}

export interface Node {
    id: string;
    name: string;
    children?: Node[];
}

export interface MyTreeNodeDatum extends RawNodeDatum {
    depth: number;
    name: string;
    id: string;
}

export interface RoadmapListProps {
    userData?: {
        displayName: string;
        id: string;
    } | null;
}

export interface DragItem {
    id: string;
    type: string;
}
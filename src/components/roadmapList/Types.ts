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
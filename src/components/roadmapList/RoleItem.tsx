import React from "react";
import SkillItem from "./SkillItem";
import { Role as RoleType } from "./Types";

interface RoleItemProps {
    role: RoleType;
}

const RoleItem: React.FC<RoleItemProps> = ({ role }) => {
    return (
        <div>
            <h3>{role.name}</h3>
            <p>{role.description}</p>
            {role.skills.map((skill) => (
                <SkillItem key={skill.skillId} skill={skill} />
            ))}
        </div>
    );
};

export default RoleItem;

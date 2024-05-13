import React from 'react';
import { Skill as SkillType } from '../Types';

interface SkillItemProps {
    skill: SkillType;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
    return (
        <div>
            <h4>{skill.name}</h4>
            <p>{skill.description}</p>
        </div>
    );
};

export default SkillItem;
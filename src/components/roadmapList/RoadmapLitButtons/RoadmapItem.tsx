import React from "react";
import RoleItem from "./RoleItem";
import { Roadmap as RoadmapType } from "../Types";

interface RoadmapItemProps {
    roadmap: RoadmapType;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ roadmap }) => {
    return (
        <div>
            <h2>{roadmap.name}</h2>
            <p>{roadmap.description}</p>
            {roadmap.roles.map((role) => (
                <RoleItem key={role.roleId} role={role} />
            ))}
        </div>
    );
};

export default RoadmapItem;

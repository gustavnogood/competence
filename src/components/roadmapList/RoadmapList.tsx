import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RoadmapList.module.css";
import { loadingImg } from "../../assets";

interface Roadmap {
    id: string;
    name: string;
    description: string;
    roles: Role[];
}

interface Role {
    roleId: string;
    name: string;
    description: string;
    skills: Skill[];
}

interface Skill {
    skillId: string;
    name: string;
    description: string;
}

const RoadmapList = (): React.ReactElement => {
    const api = "/api/roadmap";

    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);
    const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
    const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        getRoadmaps();
    }, []);

    const getRoadmaps = () => {
        setIsLoading(true);
        axios.get(api)
            .then((res) => {
                setRoadmaps(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching roadmaps:", error);
                setIsLoading(false);
            });
    };

    const handleRoadmapClick = (id: string, description: string) => {
        if (selectedRoadmapId === id) {
            setSelectedRoadmapId(null);
            setDescription("");
        } else {
            setSelectedRoadmapId(id);
            setDescription(description);
            setSelectedRoleId(null);
            setSelectedSkillId(null);
        }
    };

    const handleRoleClick = (id: string, description: string) => {
        if (selectedRoleId === id) {
            setSelectedRoleId(null);
            setDescription("");
        } else {
            setSelectedRoleId(id);
            setDescription(description);
            setSelectedSkillId(null);
        }
    };

    const handleSkillClick = (id: string, description: string) => {
        if (selectedSkillId === id) {
            setSelectedSkillId(null);
            setDescription("");
        } else {
            setSelectedSkillId(id);
            setDescription(description);
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.RoadmapList}>
                <h1 className={styles.WelcomeTitle}>Welcome to your roadmap!</h1>
                {isLoading ? (
                    <img className={styles.Loading} alt="loading" src={loadingImg} />
                ) : (
                    <div className={styles.RoadmapsContainer}>
                        {roadmaps.map((roadmap) => (
                            <div className={styles.RoadmapWrapper} key={roadmap.id}>
                                <button
                                    className={styles.RoadmapButton}
                                    onClick={() => handleRoadmapClick(roadmap.id, roadmap.description)}
                                >
                                    {roadmap.name}
                                </button>
                                {selectedRoadmapId === roadmap.id && (
                                    <div className={styles.RolesContainer}>
                                        {roadmap.roles.map((role) => (
                                            <div key={role.roleId}>
                                                <button
                                                    className={`${styles.RoleButton} ${selectedRoleId === role.roleId && styles.Selected}`}
                                                    onClick={() => handleRoleClick(role.roleId, role.description)}
                                                >
                                                    {role.name}
                                                </button>
                                                {selectedRoleId === role.roleId && (
                                                    <div className={styles.SkillsContainer}>
                                                        {role.skills.map((skill) => (
                                                            <button
                                                                className={`${styles.SkillButton} ${selectedSkillId === skill.skillId && styles.Selected}`}
                                                                key={skill.skillId}
                                                                onClick={() => handleSkillClick(skill.skillId, skill.description)}
                                                            >
                                                                {skill.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {description && (
                <div className={styles.DescriptionContainer}>
                    <h2 className={styles.DescriptionTitle}>Description</h2>
                    <p className={styles.Description}>{description}</p>
                </div>
            )}
        </div>
    );
};

export default RoadmapList;
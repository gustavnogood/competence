import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RoadmapList.module.css";
import { loadingImg } from "../../assets";
import { Button } from '@mui/material';


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
}

export const RoadmapList = (): React.ReactElement => {
	const api = "/api/roadmap";

	const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
	const [isLoadingGet, setIsLoadingGet] = useState(false);

	useEffect(() => {
		getRoadmaps();
	}, []);

	const getRoadmaps = () => {
		setIsLoadingGet(true);
		axios.get(api).then((res) => {
			setRoadmaps(res.data);
			setIsLoadingGet(false);
		});
	};

	const handleRoadmapClick = (id: string) => {
		
		console.log("Roadmap clicked:", id);
	};

	const handleRoleClick = (id: string) => {
		
		console.log("Role clicked:", id);
	};

	return (
		<div className={styles.Container}>
			<div className={styles.MovieList}>
				<h1 className={styles.WelcomeTitle}>Welcome to your roadmap!</h1>
				{isLoadingGet ? (
					<img
						className={styles.Loading}
						alt="loading"
						src={loadingImg}
					/>
				) : (
					<>
						{roadmaps.map((roadmap) => (
							<div className={styles.RoadmapWrapper} key={roadmap.id}>
								<Button
									className={styles.RoadmapButton}
									onClick={() => handleRoadmapClick(roadmap.id)}
								>
									{roadmap.id}
								</Button>
								{roadmap.roles.map((role) => (
									<Button
										className={styles.RoleButton}
										key={role.roleId}
										onClick={() => handleRoleClick(role.roleId)}
									>
										{role.name}
									</Button>
								))}
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default RoadmapList;
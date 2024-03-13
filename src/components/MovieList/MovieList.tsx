import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MovieList.module.css";

export class Movie {
	id?: string;
	name: string;
	description: string;
	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}
}

export const MovieList = (): React.ReactElement => {
	const api = "/api/roadmap";

	const [movies, setMovies] = useState<Array<Movie>>([]);
	const [movieName, setMovieName] = useState<string>();
	const [movieDescription, setMovieDescription] = useState<string>();
	const [isLoadingGet, setIsLoadingGet] = useState(false);
	const [isLoadingPost, setIsLoadingPost] = useState(false);

	useEffect(() => {
		getMovies();
	}, []);

	const getMovies = () => {
		setIsLoadingGet(true);
		axios.get(api).then((res) => {
			setMovies(res.data);
			setIsLoadingGet(false);
		});
	};

	const createMovie = (
		movieName: string | undefined,
		movieDescription: string | undefined
	): void => {
		console.log(movieName, movieDescription);
		if (movieName === undefined || movieDescription === undefined) return;
		setIsLoadingPost(true);
		const newMovie = new Movie(movieName, movieDescription);
		axios.post(api, newMovie).then(() => {
			setMovies([...movies, newMovie]);
			setMovieName("");
			setMovieDescription("");
			setIsLoadingPost(false);
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		createMovie(movieName, movieDescription);
	};

	return (
		<div className={styles.Container}>
            <div className={styles.MovieList}>
                <h1 className={styles.WelcomeTitle}>
                Welcome to movie list
                </h1>
                {isLoadingGet ? (
            <img
            className={styles.Loading}
            alt="loading"
            src="loading.png"
            />
            ) : (
            <>
            {Array.isArray(movies) && movies.map((movie) => (
                <div
                    className={styles.MovieWrapper}
                    key={`${movie.id}-key`}
                >
                    <h3>{movie.name}</h3>
                    <p>{movie.description}</p>
                </div>
            ))}
        </>
    )}
</div>

			<hr />
			<div className={styles.InputWrapper}>
				{isLoadingPost ? (
					<img
						className={styles.Loading}
						alt="loading"
						src="loading.png"
					/>
				) : (
					<>
						<form onSubmit={handleSubmit} id="movie-form">
							<input
								className={styles.MovieInput}
								name="movieName"
								id="movieName"
								type="text"
								placeholder="Movie Title"
								value={movieName}
								onChange={(event) =>
									setMovieName(event.target.value)
								}
								required
							/>
							<textarea
								className={styles.MovieTextArea}
								name="movieDescription"
								id="movieDescription"
								placeholder="Movie Description"
								value={movieDescription}
								onChange={(event) =>
									setMovieDescription(event.target.value)
								}
								required
							/>
							<button
								className={styles.MovieSubmit}
								type="submit"
							>
								Add Movie
							</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
};
export default MovieList;

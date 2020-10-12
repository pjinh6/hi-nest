import { Injectable, NotFoundException } from '@nestjs/common';
import { IMovie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
	private movies: IMovie[] = [];

	getAll(): IMovie[] {
		return this.movies;
	}

	getOne(id: number): IMovie {
		const movie = this.movies.find(movie => movie.id === id);
		if (!movie) throw new NotFoundException(`Movie with ID ${ id } not found.`);
		return movie;
	}

	deleteOne(id: number) {
		this.getOne(id);
		this.movies = this.movies.filter(movie => movie.id !== +id);
		return true;
	}

	create(movieData: CreateMovieDTO) {
		this.movies.push({
			id: this.movies.length + 1,
			... movieData
		});
	}

	update(id: number, updateData: UpdateMovieDTO) {
		const movie = this.getOne(id);
		this.deleteOne(id);
		this.movies.push({ ...movie, ...updateData });
	}
}

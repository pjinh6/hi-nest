import { Controller, Get, Post, Delete, Patch, Param, Body, Query, Req, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IMovie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

	constructor(readonly movieService: MoviesService) {}

	@Get()
	getAll(/* @Req() req, @Res() res */): IMovie[] {
		return this.movieService.getAll();
	}

	/// :id보다 밑에 있으면 search를 ID로 인식한다.
	@Get('/search')
	search(@Query('year') searchingYear: string) {
		return '';
	}

	@Get('/:id')
	getOne(@Param('id') movieId: number): IMovie {
		return this.movieService.getOne(movieId);
	}

	@Post()
	create(@Body() movieData: CreateMovieDTO) {
		return this.movieService.create(movieData);
	}

	@Delete('/:id')
	remove(@Param('id') movieId: number) {
		return this.movieService.deleteOne(movieId);
	}

	@Patch('/:id')
	patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
		return this.movieService.update(movieId, updateData)
	}

	
}

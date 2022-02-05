import { memo } from "react";
import { Grid, GridCellRenderer } from "react-virtualized";

import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  };

  movies: Array<
    Array<{
      imdbID: string;
      Title: string;
      Poster: string;
      Ratings: Array<{
        Source: string;
        Value: string;
      }>;
      Runtime: string;
    }>
  >;
}

function ContentComponent({ selectedGenre, movies }: ContentProps) {
  console.log(movies);

  const cellRenderer: GridCellRenderer = ({
    rowIndex,
    columnIndex,
    key,
    style,
  }) => {
    return (
      <div key={key} style={style}>
        {movies[rowIndex][columnIndex] && (
          <MovieCard
            key={movies[rowIndex][columnIndex].imdbID}
            title={movies[rowIndex][columnIndex].Title}
            poster={movies[rowIndex][columnIndex].Poster}
            runtime={movies[rowIndex][columnIndex].Runtime}
            rating={movies[rowIndex][columnIndex].Ratings[0].Value}
          />
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          <Grid
            cellRenderer={cellRenderer}
            columnCount={movies[0]?.length || 3}
            columnWidth={250}
            height={750}
            rowCount={movies.length}
            rowHeight={400}
            width={1150}
          />
        </div>
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return (
    Object.is(prevProps.movies, nextProps.movies) &&
    prevProps.selectedGenre === nextProps.selectedGenre
  );
});

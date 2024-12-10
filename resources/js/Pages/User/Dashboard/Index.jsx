import FeaturedMovie from "@/Components/FeaturedMovie";
import { MovieCard } from "@/Components/MovieCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";
import Flickity from "react-flickity-component";

function Dashboard({auth, featuredMovies,movies}) {
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };
    return (
        <Authenticated auth={auth.user}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
                <title>Dashboard</title>
            </Head>
            <div>
                <div className="font-semibold text-[22px] text-black mb-4">
                    Featured Movies
                </div>
                <Flickity className="gap-[30px]" options={flickityOptions}>
                    {/* Movie Thumbnail */}
                    {featuredMovies.map((featuredMovies) => (
                        <FeaturedMovie
                            key={featuredMovies.id}
                            slug={featuredMovies.slug}
                            name={featuredMovies.name}
                            category={featuredMovies.category}
                            thumbnail={featuredMovies.thumbnail}
                            rating={featuredMovies.rating}
                        />
                    ))}
                </Flickity>
            </div>
            <div className="mt-[50px]">
                <div className="font-semibold text-[22px] text-black mb-4">
                    Browse
                </div>
                <Flickity>
                    {movies.map((movies) => (
                        <MovieCard
                            key={movies.id}
                            slug={movies.slug}
                            name={movies.name}
                            category={movies.category}
                            thumbnail={movies.thumbnail}
                            rating={movies.rating}
                        />
                    ))}
                </Flickity>
            </div>
        </Authenticated>
    );
}

export default Dashboard;

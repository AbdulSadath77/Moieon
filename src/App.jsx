import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWU5NzVmMGNkMTE0NDUxNWRkZjMzYzRhOGY0YmExYyIsInN1YiI6IjY2MzcxZWRjYzYxNmFjMDEyNTFhZThhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DdgW0c_xryf91lffxR5_JBMTGCmvctmrhC9omHf4b0M",
  },
};

function App() {
  const [apiRes, setApiRes] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [moviesResults, setMoviesResults] = useState([]);
  const [previewDetails, setPreviewDetails] = useState({});

  const preview = useRef(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${pageCount}&sort_by=popularity.desc`,
        options
      )
      .then((res) => {
        // console.log(res.data);
        setApiRes(res.data);
        // console.log(res.data.results);
        setMoviesResults(res.data.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [pageCount, setPageCount]);

  function previewMovieDetails(indexOfElement) {
    // console.log(indexOfElement);
    // console.log(apiRes.results[indexOfElement]);
    setPreviewDetails(apiRes.results[indexOfElement]);
  }

  function toggleDialogueBox() {
    preview.current.classList.toggle("hidden");
    preview.current.classList.toggle("grid");
  }

  return (
    <div className="relative flex flex-col h-screen bg-black">
      <div className="w-full flex justify-between p-4 border-b-2 border-white">
        <h2 className="text-4xl italic font-bold text-red-600">Movieon</h2>
        {/* Add the search feature later if any upgrade is required */}
        {/* <form
          className="flex gap-2 w-1/2 rounded-md overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="search"
            name="search"
            id="search"
            className="border-2 border-red-600 bg-white grow rounded-md p-2 font-semibold text-xl"
            placeholder="Search here..."
          />
          <input type="submit" value="Search" className="btn-class" />
        </form> */}
        <button
          type="button"
          className="btn-class bg-white text-black font-semibold"
        >
          Coffee
        </button>
      </div>

      {/* Dialogue Box */}
      <div
        ref={preview}
        className="fixed hidden h-full w-full max-w-[1280px] bg-[#00000070]"
      >
        <div className="w-96 md:w-auto h-fit mt-8 mx-auto bg-white rounded-md flex flex-col gap-1 text-black p-4">
          <button
            type="button"
            className="bg-gray-300 size-14 text-2xl font-bold self-end rounded-md"
            onClick={toggleDialogueBox}
          >
            X
          </button>
          <div className="flex flex-wrap gap-3 lg:flex-nowrap">
            <img
              src={`https://image.tmdb.org/t/p/w500${previewDetails.poster_path}`}
              alt={`${previewDetails.original_title} Poster`}
              className="w-72 rounded-md mx-auto"
            />
            <div className="flex flex-col gap-2 min-w-60 max-w-96 p-2">
              <h4 className="text-3xl font-semibold">
                {previewDetails.original_title}
              </h4>
              <h5 className="grow text-lg text-slate-800">
                {previewDetails.overview}
              </h5>
              <div className="flex flex-col gap-0.5">
                <h6 className="font-semibold">
                  Release Date:&nbsp;
                  <span className="text-slate-800 font-normal">
                    {previewDetails.release_date}
                  </span>
                </h6>
                <h6 className="font-semibold">
                  Popularity:&nbsp;
                  <span className="text-slate-800 font-normal">
                    {previewDetails.popularity}
                  </span>
                </h6>
                <h6 className="font-semibold">
                  Total Votes:&nbsp;
                  <span className="text-slate-800 font-normal">
                    {previewDetails.vote_count}
                  </span>
                </h6>
                <h6 className="font-semibold">
                  Vote Average:&nbsp;
                  <span className="text-slate-800 font-normal">
                    {previewDetails.vote_average}
                  </span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grow overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {moviesResults.map((movie, i) => (
            <div
              key={movie.id}
              className="bg-white min-w-32 min-h-20 rounded-xl overflow-hidden"
              onClick={() => {
                previewMovieDetails(i);
                toggleDialogueBox();
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.original_title} Poster`}
                className="border-b-2 border-gray-200"
              />
              <h4 className="px-2 py-1 text-xl font-bold text-slate-800 line-clamp-2">
                {movie.original_title}
              </h4>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 py-8">
          {pageCount > 1 && (
            <button
              type="button"
              className="btn-class"
              onClick={() => setPageCount((pageCount) => pageCount - 1)}
            >
              &lt; Prev
            </button>
          )}
          {pageCount < apiRes.total_pages && (
            <button
              type="button"
              className="btn-class"
              onClick={() => setPageCount((pageCount) => pageCount + 1)}
            >
              Next &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

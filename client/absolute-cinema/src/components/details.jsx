import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, setQty } from "../store/appSlice";
import Swal from "sweetalert2";
export default function Details({ movieId, isBuy, toIDR, index }) {
  const qty = useSelector((state) => {
    return state.qty;
  });
  const dispatch = useDispatch();
  const movies = useSelector((state) => {
    return state.movies;
  });
  const [movie, setMovie] = useState({});
  async function movieDetails() {
    try {
      const response = await axios({
        method: "get",
        url: `https://absolute-cinema.habibmufti.online/movies/${movieId}`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setMovie(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    movieDetails();
    dispatch(setQty(1));
  }, []);

  async function buyTicket(MovieId, qty) {
    try {
      const response = await axios({
        method: "post",
        url: `https://absolute-cinema.habibmufti.online/buy`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
        data: {
          MovieId,
          qty,
        },
      });
      window.snap.pay(response.data.token, {
        onSuccess: async function (result) {
          await axios({
            method: "patch",
            url: `https://absolute-cinema.habibmufti.online/pay/${response.data.ticket.id}`,
            headers: { Authorization: `Bearer ${localStorage.access_token}` },
          });
          console.log("success");
        },
        onPending: function (result) {
          console.log("pending");
          console.log(result);
        },
        onError: function (result) {
          console.log("error");
          console.log(result);
        },
        onClose: async function () {
          await axios({
            method: "patch",
            url: `https://absolute-cinema.habibmufti.online/close/${response.data.ticket.id}`,
            headers: { Authorization: `Bearer ${localStorage.access_token}` },
            data: {
              url: response.data.token,
            },
          });
          console.log("customer closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: "Error!",
        text: errMsg,
        icon: "error",
      });
    }
  }
  return (
    <>
      <dialog id={movieId} className="modal">
        <div className="modal-box w-fit">
          <h3 className="font-bold text-xl text-center pb-3">{movie.title}</h3>
          <img className="rounded-xl pb-2" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={`poster ${movie.title}`} />
          <p>
            <span className="font-semibold">Genres: </span>
            {movie.genres &&
              movie.genres.map((e, i) => {
                return <span key={e.id}>{e.name} </span>;
              })}
          </p>
          <p>
            <span className="font-semibold">Release Date: </span> {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating: </span> {movie.vote_average}
          </p>
          <p>
            <span className="font-semibold">Duration: </span> {movie.runtime} minutes
          </p>
          {isBuy ? (
            <>
              <table className="border-y-4">
                <thead></thead>
                <tbody>
                  <tr className="">
                    <td className="pr-3">
                      <span className="font-semibold">Price: </span> {toIDR(movies[index].price)}{" "}
                    </td>
                    <td>
                      <span className="font-semibold">Quantity: </span>
                      <button className="px-3" onClick={() => qty > 1 && dispatch(decrement())}>
                        -
                      </button>
                      <button className="px-1">{qty}</button>
                      <button className="px-3" onClick={() => dispatch(increment())}>
                        +
                      </button>
                    </td>
                    <td>
                      <span className="font-semibold">Subtotal: </span> {toIDR(movies[index].price * qty)}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-justify">
              <span className="font-semibold">Synopsis: </span>
              {movie.overview}
            </p>
          )}
          <div className="modal-action">
            {isBuy && (
              <form method="dialog">
                <button
                  className="btn btn-primary"
                  onClick={(event) => {
                    event.preventDefault;
                    buyTicket(movieId, qty);
                  }}
                >
                  Buy Ticket
                </button>
              </form>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => dispatch(setQty(1))}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

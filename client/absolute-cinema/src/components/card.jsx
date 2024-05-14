import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setIsBuy } from "../store/appSlice";
import Details from "./details";

export default function Card() {
  const dispatch = useDispatch()
  const movies = useSelector(state => {return state.movies})
  const isBuy = useSelector(state => {return state.isBuy})
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchMovies())
  }, []);
  
  function toIDR (price){
      const formatted = price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    return formatted
  }
  return (
    <div className="container grid grid-rows-10 grid-flow-col gap-4">
      {movies.map((e, i) => {
        return (
          <div className="card w-auto bg-base-100 shadow-xl grid-rows-subgrid row-span-2" key={e.id}>
            <figure>
              <img src={e.imgUrl} alt={e.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{e.title}</h2>
              <h6>
                <span className="font-semibold">Price</span> {toIDR(e.price)}
              </h6>
              <div className="card-actions justify-end">
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(setIsBuy(false));
                    document.getElementById(e.id).showModal();
                  }}
                >
                  Details
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(setIsBuy(true));
                    document.getElementById(e.id).showModal();
                  }}
                >
                  Buy Now
                </button>
                <Details key={e} movieId={e.id} isBuy={isBuy} toIDR={toIDR} index={i}/>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import Print from "./print";

export default function Ticket() {
  const [tickets, setTickets] = useState([]);
  async function getTickets() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://absolute-cinema.habibmufti.online/tickets",
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setTickets(data);
    } catch (error) {
      console.log(error);
    }
  }
  const paidTransactions = tickets.filter((ticket) => ticket.isPaid);
  const unPaidTransaction = tickets.filter((ticket) => !ticket.isPaid);
  async function handleDelete(id) {
    try {
      await axios({
        method: "delete",
        url: `https://absolute-cinema.habibmufti.online/${id}`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      getTickets();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTickets();
  }, []);
  return (
    <>
      <div className="container px-36">
        <h3 className="text-center text-3xl font-bold py-4">My Ticket</h3>
        <table className="table">
          <thead className="text-xl text-center">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Movie</th>
              <th scope="col">Synopsis</th>
              <th scope="col">Image</th>
              <th scope="col">Total Ticket</th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-l">
            {paidTransactions.map((e, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{e.Movie.title}</td>
                  <td className="text-justify w-2/5">{e.Movie.synopsis}</td>
                  <td>
                    <img src={e.Movie.imgUrl} className="w-80 rounded-md" alt={"image of " + e.Movie.title} />
                  </td>
                  <td className="text-center">{e.quantity}</td>
                  <td className="text-center w-64">
                    <button className="btn" onClick={() => document.getElementById(e.id).showModal()}>
                      Print
                    </button>
                    <Print key={e.id} id={e.id} ticket={e} />
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => {
                        handleDelete(e.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

import QRCode from "react-qr-code";

export default function Print({ id, ticket }) {
  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-3">Your Ticket</h3>
          <div className="flex justify-center">
            <QRCode value={JSON.stringify(ticket)} />
          </div>
          <p className="py-4">Scan your ticket at ticket machine</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

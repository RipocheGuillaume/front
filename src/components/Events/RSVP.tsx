import { useState } from "react";
import { useForm } from "react-hook-form";
import storeEvent from "../../store/storeEvent";

type RSVPProps = {
  setIsOpenRSVP: (isOpenRSVP: boolean) => void;
  event_id: number;
};

function RSVP({ setIsOpenRSVP, event_id }: RSVPProps) {
  const { posts, loading, error, createRSVP } = storeEvent() as StoreEvent;
  const [status, setStatus] = useState<"attending" | "maybe" | "declined">(
    "maybe"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitRSVP = (data) => {
    const now = new Date();
    const newData = {
      ...data,
      status: status,
      response_date: now.toISOString(),
      event_id: event_id,
      user_id: 1,
    };
    console.log(newData);

    setIsOpenRSVP(false);
  };
  console.log(errors);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          RSVP for Team Building Workshop
        </h2>
        <form onSubmit={handleSubmit(onSubmitRSVP)} className="flex flex-col ">
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => setStatus("attending")}
              className={`px-4 py-2 border rounded ${
                status === "attending" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              Attending
            </button>
            <button
              type="button"
              onClick={() => setStatus("maybe")}
              className={`px-4 py-2 border rounded ${
                status === "maybe" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              maybe
            </button>
            <button
              type="button"
              onClick={() => setStatus("declined")}
              className={`px-4 py-2 border rounded ${
                status === "declined" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              declined
            </button>
          </div>
          <label htmlFor="notes" className="">
            notes
          </label>
          <textarea
            {...register("notes", { required: true })}
            className="border rounded-md p-2 mb-3"
          />

          <input type="submit" className="p-2 bg-green-500 rounded-md" />
        </form>
      </div>
    </div>
  );
}

export default RSVP;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import storeEvent from "../../store/storeEvent";
import type { StoreEvent } from "../../types/types";
import RSVP from "./RSVP";

function Events() {
  const { posts, loading, error, getAllEvents, createEvent } =
    storeEvent() as StoreEvent;
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenRSVP, setIsOpenRSVP] = useState(false);
  const [locationType, setLocationType] = useState<"online" | "physical">(
    "online"
  );

  useEffect(() => {
    getAllEvents();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const newData = {
      ...data,
      status: "published",
      creator_id: 1,
      group_id: null,
      is_private: false,
    };
    console.log(newData);
    createEvent(newData);
    setIsOpenCreate(false);
  };

  console.log(errors);

  return (
    <>
      <div className="flex justify-end mr-10">
        <button
          onClick={() => setIsOpenCreate(true)}
          className="p-5 bg-green-500 rounded-md"
        >
          Create event
        </button>
      </div>
      {/* layout pour la creation d'un evenement */}
      {isOpenCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Event Title"
                {...register("title", { required: true })}
              />
              <input
                type="datetime-local"
                placeholder="start date"
                {...register("start_date", { required: true })}
              />
              <input
                type="dateTime-local"
                placeholder="end date"
                {...register("end_date", { required: true })}
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setLocationType("online")}
                  className={`px-4 py-2 border rounded ${
                    locationType === "online"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Online
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType("physical")}
                  className={`px-4 py-2 border rounded ${
                    locationType === "physical"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Physical
                </button>
              </div>

              <input
                type="text"
                placeholder={
                  locationType === "online" ? "Meeting URL" : "Venue"
                }
                {...register("location", { required: true })}
              />
              <input
                type="number"
                placeholder="Maximum Participants"
                {...register("max_participants", { required: true })}
              />
              <textarea {...register("description", { required: true })} />
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsOpenCreate(false)}
                  className="p-2 bg-red-500 rounded-md"
                >
                  annuler
                </button>
                <input type="submit" className="p-2 bg-green-500 rounded-md" />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ma page event */}
      <div className="flex flex-col gap-10 p-15 text-sm grow">
        <div>
          {posts.map((post) => (
            <div key={post.id} className=" p-10 w-full border rounded-sm mb-5">
              <div>
                <div className="flex justify-between ">
                  <div>{post.title}</div>
                  <button
                    onClick={() => setIsOpenRSVP(true)}
                    className="p-2 bg-green-500 rounded-md"
                  >
                    RSVP
                  </button>
                  {/* layout pour la réservation */}
                  {isOpenRSVP && (
                    <RSVP setIsOpenRSVP={setIsOpenRSVP} event_id={post.id} />
                  )}
                </div>
                <div className="flex">
                  <div className="grow-1">
                    <div className="">
                      {new Date(post.start_date).toISOString().slice(0, 10)}
                    </div>
                    <div>{post.location}</div>
                  </div>
                  <div className="grow-1">
                    <div>
                      {new Date(post.start_date).toISOString().slice(11, 16)}-
                      {new Date(post.end_date).toISOString().slice(11, 16)}
                    </div>
                    <div>{post.max_participants}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;

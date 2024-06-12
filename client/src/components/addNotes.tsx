import useAddNoteMutation from "../actions/notes/addNotesMutation";

// handling add note form
const AddNotes = ({ searchTerm }: any) => {
  const { mutate: addNote, isPending } = useAddNoteMutation();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addNote({
      title: e.target.title.value,
      content: e.target.content.value,
    });
    e.target.title.value = "";
    e.target.content.value = "";
  };

  return (
    <>
      {searchTerm && searchTerm.length > 0 ? null : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              placeholder="Title"
              name="title"
              required
              className="input input-bordered input-md w-full max-w-xs mb-4 text-xl"
            />
            <textarea
              required
              name="content"
              placeholder="Content.."
              className="textarea textarea-bordered textarea-lg w-full max-w-xs mb-6 text-lg"
            ></textarea>
            <button
              type="submit"
              className="btn btn-md lg:w-44 md:w-44 w-2/5"
              disabled={isPending}
            >
              Add
              {isPending && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddNotes;

import { useEffect, useState } from "react";
import useGetNotesByUserQuery from "../actions/notes/getNotesByUserId";
import useDeleteNoteMutation from "../actions/notes/deleteNotes";
import useUpdateNoteMutation from "../actions/notes/updateNotes";

const Notes = ({ searchTerm }: any) => {
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const { data } = useGetNotesByUserQuery();
  const { mutate: deleteNote, isPending: isDeletePending } = useDeleteNoteMutation();
  const [selectedNote, setSelectedNote] = useState<noteTypes | null>(null);
  const { mutate: updateNote, isPending } = useUpdateNoteMutation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  type noteTypes = {
    id: number;
    title: string;
    content: string;
  };

  useEffect(() => {
    if (data) {
      const filteredData = data?.userNotes.filter((item: any) =>
        item.title.toLowerCase().includes(searchTerm?.toLowerCase() || "")
      );
      setFilteredData(filteredData);
    }
  }, [searchTerm, data]);

  // Delete note
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this note?") === true) {
      deleteNote({
        noteId: id,
      });
    } else {
      return;
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (note: noteTypes) => {
    setSelectedNote(note);
    setOpenEditor(true);
  };

  // update note
  const handleSave = () => {
    updateNote({
      noteId: selectedNote?.id,
      title: selectedNote?.title,
      content: selectedNote?.content,
    });
    setOpenEditor(false);
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setOpenEditor(false);
    setSelectedNote(null);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-14 rounded-lg shadow-lg p-14 lg:mx-24">
      {filteredData.length > 0 ? (
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-8 text-center">My Notes</h1>
          {currentItems.map((note: noteTypes) => (
            <div key={note.id} className="mb-8">
              <div className="bg-base-200 rounded-lg p-6 shadow-md">
                {openEditor && selectedNote?.id === note.id ? (
                  <div className="bg-base-100 p-4 rounded-lg">
                    <input
                      className="input input-bordered w-full mb-2"
                      placeholder={selectedNote.title}
                      defaultValue={selectedNote.title}
                      onChange={(e) => {
                        setSelectedNote({
                          ...selectedNote,
                          title: e.target.value,
                        });
                      }}
                    />
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder={selectedNote.content}
                      defaultValue={selectedNote.content}
                      onChange={(e) => {
                        setSelectedNote({
                          ...selectedNote,
                          content: e.target.value,
                        });
                      }}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        className="btn btn-sm mr-2"
                        onClick={handleSave}
                        disabled={isPending}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={handleCancel}
                        disabled={isPending}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                    <p className="text-lg mb-4">{note.content}</p>
                  </>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    className="btn btn-sm btn-ghost hover:bg-transparent"
                    onClick={() => handleEdit(note)}
                    disabled={isPending || isDeletePending}
                  >
                    {" "}
                    {isPending || isDeletePending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    className="btn btn-sm btn-ghost hover:bg-transparent"
                    onClick={() => handleDelete(note.id)}
                    disabled={isPending || isDeletePending}
                  >
                    {isPending || isDeletePending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-8">
            <div className="join">
              <button
                className="join-item btn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                «
              </button>
              <button className="join-item btn btn-active">
                {currentPage}
              </button>
              <button
                className="join-item btn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                »
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-8 text-center">My Notes</h1>
          <p className="text-lg mb-4 text-center">No notes found.</p>
        </div>
      )}
    </div>
  );
};

export default Notes;

const isAuthenticated = () => {
  const notesUser = localStorage.getItem("NotesUser");
  if (notesUser === "isAuthenticated") {
    return true;
  } else {
    return false;
  }
};

export default isAuthenticated;

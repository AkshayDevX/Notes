import { useState } from "react";
import AddNotes from "../components/addNotes";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import Notes from "../components/notes";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <div>
      <Header handleSearchTerm={handleSearchTerm} />
      <div className="mx-auto mt-10 mb-8 px-5 lg:px-24 md:px-24">
      <AddNotes searchTerm={searchTerm} />
      <Notes searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

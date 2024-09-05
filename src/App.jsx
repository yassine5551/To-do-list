import { useState } from "react";

function App() {
  const [person, setPerson] = useState({
    nom: "",
    lastName: "",
    email: "",
    pays: "",
  });
  const [people, setPeople] = useState([]);

  const [currentPage, setCurrentPage] = useState([]);
  const rowsPerPage = 5;

  const handleSubmit = (e) => {
    e.preventDefault();

    const personExists = people.some(
      (p) =>
        p.nom === person.nom &&
        p.lastName === person.lastName &&
        p.email === person.email &&
        p.pays === person.pays
    );

    if (personExists) {
      alert("This person already exists!");
      return; // Stop submission if person exists
    }


    const NewPerson = { ...person, id: new Date().getTime() };
    setPeople([...people, NewPerson]);
    setPerson({
      nom: "",
      lastName: "",
      email: "",
      pays: "",
    });
    const newTotalPages = Math.ceil([...people, NewPerson].length / rowsPerPage);
    setCurrentPage(newTotalPages);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPerson((prevPerson) => ({ ...prevPerson, [name]: [value] }));
  };

  // pagination logic

  const indexOfLastPerson = currentPage * rowsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - rowsPerPage;
  const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

  const totalPages = Math.ceil(people.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="dv">
            <label htmlFor="name">
              Name :
              <input
                type="text"
                name="nom"
                value={person.nom}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="dv">
            <label htmlFor="lastName">
              lastName :
              <input
                type="text"
                name="lastName"
                value={person.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="dv">
            <label htmlFor="email">
              Email :
              <input
                type="email"
                name="email"
                value={person.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="dv">
            <label htmlFor="pays">
              pays :
              <input
                type="text"
                name="pays"
                value={person.pays}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit">Send</button>
        </div>
      </form>
      {people.length > 0 && (
        <>
          <table>
            <tr>
              <th>Name:</th>
              <th>Last Name:</th>
              <th>Email :</th>
              <th>Country :</th>
            </tr>

            {currentPeople.map((person) => (
              <>
                <tbody key={person.id}>
                  <td>{person.nom}</td>
                  <td>{person.lastName}</td>
                  <td>{person.email}</td>
                  <td>{person.pays}</td>
                </tbody>
              </>
            ))}
          </table>
          {/* section pagination */}
          <div style={{ marginTop: "10px" }} className='page'>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;

import "./AnnouncementsStyle.css";
import { useState } from "react";
import WaterDropIcon from '@mui/icons-material/WaterDrop';


const Announcements = () => {
  const [annonces, setAnnonces] = useState([
    {
      id: 1,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
    },
    {
      id: 2,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
    },
    {
      id: 3,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
    },
    {
      id: 4,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
    },
    {
      id: 5,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
    },
  ]);

  const [showAnnonce, setShowAnnonce] = useState(false);

  
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const openCreateAnnonce = () => {
    setShowAnnonce(true);
  };

  const closeCreateAnnonce = () => {
    setShowAnnonce(false);
    setNewTitle("");
    setNewDate("");
    setNewDescription("");
  };

  const handleCreateAnnonce = () => {
    if (!newTitle || !newDate || !newDescription) {
      alert("Please fill out all fields.");
      return;
    }

    const newAnnonce = {
      id: Date.now(), // unique id
      title: newTitle,
      date: newDate,
      description: newDescription,
    };

    setAnnonces([newAnnonce, ...annonces]);
    closeCreateAnnonce();
  };

  return (
    <>
      <div className="MainAnnonce">
        <div>
          {annonces.map((annonce) => (
            <div className="Annonce-Item" key={annonce.id}>
              <div className="annonce-title">
                <WaterDropIcon className="icon1" />
                <h3>{annonce.title}</h3>
              </div>
              <p>
                <span>Date :</span> {annonce.date}
              </p>
              <p>{annonce.description}</p>
            </div>
          ))}
        </div>

        <div className="CreateAnnonce">
          <button onClick={openCreateAnnonce}>Create Annonce</button>
        </div>
      </div>

      {showAnnonce && (
        <div className="ModalOverlay">
          <div className="ModalContent">
            <h2>Create New Annonce</h2>
            <div>
              <p>Title</p>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <p>Date</p>
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            <div>
              <p>Description</p>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="ModalButtons">
              <button className="CreateButton" onClick={handleCreateAnnonce}>Create</button>
              <button className="CloseButton" onClick={closeCreateAnnonce}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcements;

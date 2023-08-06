import React, { useEffect, useState } from "react";
import Partition from "./Partition";

const getRandomColor = () => {
  const colors = ["red", "green", "blue", "yellow", "orange", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const App = () => {
  const [partitions, setPartitions] = useState([]);

  useEffect(() => {
    // Set the initial color for the whole viewport
    setPartitions([{ color: getRandomColor() }]);
  }, []);

  const splitVertically = (index) => {
    const newColor = getRandomColor();
    setPartitions((prevPartitions) => [
      ...prevPartitions.slice(0, index),
      { color: newColor },
      { color: prevPartitions[index].color },
      ...prevPartitions.slice(index + 1),
    ]);
  };

  const splitHorizontally = (index) => {
    const newColor = getRandomColor();
    setPartitions((prevPartitions) => [
      ...prevPartitions.slice(0, index),
      { color: prevPartitions[index].color },
      { color: newColor },
      ...prevPartitions.slice(index),
    ]);
  };

  const removePartition = (index) => {
    setPartitions((prevPartitions) =>
      prevPartitions.filter((_, i) => i !== index)
    );
  };

  const handleResize = (index, size) => {
    setPartitions((prevPartitions) => {
      const newPartitions = [...prevPartitions];
      newPartitions[index].size = size;
      return newPartitions;
    });
  };

  return (
    <>
      <div className="app-container">
        <div className="partitions-container">
          {partitions.map((partition, index) => (
            <div
              key={index}
              className="partition"
              style={{
                backgroundColor: partition.color,
                flex: partition.size ? partition.size : 1,
              }}
              onMouseUp={() => handleResize(index, null)}
            >
              <Partition color={partition.color} />
              <div
                className="resize-handle"
                onMouseDown={() => handleResize(index, partition.size)}
              ></div>
              <div className="buttons-container">
                <button onClick={() => splitVertically(index)}>v</button>
                <button onClick={() => splitHorizontally(index)}>h</button>
                {partitions.length > 1 && (
                  <button onClick={() => removePartition(index)}>-</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;

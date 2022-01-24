import { useState } from "react";
import Axios from "axios";
import UploadContainer from './containers/UploadContainer';
import Uploader from './components/Uploader';
import "antd/dist/antd.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import testImg from "./assets/uploads/gallery-1.jpg";

function App() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgPath, setImgPath] = useState("");

  // callback for data from uploader
  const imgData = (imgPathData) => {
    console.log("*** HELLO " + imgPathData + " ***")
    setImgPath(imgPathData);
  }

  const [newPrice, setNewPrice] = useState(0);

  const [inventoryList, setInventoryList] = useState([]);

  const addItem = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      description: description,
      price: price,
      imgPath: imgPath
    }).then(() => {
      setInventoryList([
        ...inventoryList,
        {
          name: name,
          description: description,
          price: price,
          imgPath: imgPath,
        },
      ]);
    });
  };

  const getInventory = () => {
    Axios.get('http://localhost:3001/inventory').then((response) => {
      setInventoryList(response.data);
    });
  };

  const updateItemPrice = (id) => {
    Axios.put('http://localhost:3001/update', {price: newPrice, id: id}).then(
      (response) => {
        setInventoryList(inventoryList.map((val) => {
          return val.id === id ? {id: val.id, name: val.name, description: val.description, price: newPrice} : val
        }))
      }
    );
  };

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setInventoryList(
        inventoryList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="info">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {setName(event.target.value);
          }}
        />
        <label>Description:</label>
        <input type="text"
          onChange={(event) => {setDescription(event.target.value);
          }}
        />
        <label>Price:</label>
        <input type="number"onChange={(event) => {setPrice(event.target.value);
          }}
          
        />

        <div>
            <Uploader
                imgData={imgData} 
            />
        </div>


        <button onClick={addItem}>Add item</button>
      </div> 

      <div className="inventory">
        <button onClick={getInventory}>Show Table</button>

        {inventoryList.map((val, key) => {
          return (
            <div className="item">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Description: {val.description}</h3>
                <h3>Price: ${val.price}</h3>
                <img src={require(`./assets/uploads/${val.imgPath}`)} alt={val.imgPath}/>
              </div>
              <div>
                  <input
                    type="text"
                    placeholder="Enter new price" 
                    onChange={(event) => {
                      setNewPrice(event.target.value);
                    }}
                  />
                  <button onClick={() => {updateItemPrice(val.id)}}>Update</button>

                  <button onClick={() => {deleteItem(val.id)}}>Delete</button>

                </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default App;

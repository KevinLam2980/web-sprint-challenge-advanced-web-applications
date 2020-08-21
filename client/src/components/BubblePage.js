import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {fetchColors} from '../api/fetchColors'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const initialFormValues = {
  code: {hex: ''},
  color: ''
}

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [newColor, setNewColor] = useState(initialFormValues)

  const handleChanges = evt => {
    evt.preventDefault()
    if(evt.target.name === 'hex'){
      setNewColor({...newColor, code: {hex: evt.target.value}})
    } else {
      setNewColor({...newColor, [evt.target.name]: evt.target.value})
    }
  }

  const sumbit = (evt) => {
    evt.preventDefault()
    axiosWithAuth()
    .post('/api/colors', newColor)
    .then(res => {
      setColorList(res.data)
      setNewColor(initialFormValues)
    })
    .catch(err => {
      console.error(err)
    })
  }
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

//   useEffect(() => {
//     axiosWithAuth()
//     .get('api/colors')
//     .then(res => {
//       console.log(res)
//         setColorList(res.data)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }, [])

useEffect(() => {
  fetchColors()
  .then(res => {
    console.log(res)
    setColorList(res.data)
  })
  .catch(err => {
    console.error(err)
  })
}, [])


  return (
    <>
    <form onSubmit={sumbit}>
      <input
      type='text'
      name='hex'
      placeholder='hex'
      onChange={handleChanges}
      value={newColor.code.hex}
      >
      </input>
      <input
      type='text'
      name='color'
      placeholder='color'
      onChange={handleChanges}
      value={newColor.color}
      >
      </input>
      <button>Submit</button>
    </form>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

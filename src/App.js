import {
  Input,
  Box,
  Button,
  Flex
} from '@chakra-ui/react'
import { useRef, useState, useEffect } from 'react';

const generateRandomColor = () => {
  const r = Math.round(Math.random() * 255)
  const g = Math.round(Math.random() * 255)
  const b = Math.round(Math.random() * 255)

  return `rgb(${r}, ${g}, ${b})`
}


function App() {

  const input1 = useRef()
  const input2 = useRef()
  const input3 = useRef()
  const dragItem1 = useRef();
  const dragItem2 = useRef();
  const dragItem3 = useRef();
  const [names1State, setNames1] = useState([])
  const [names2State, setNames2] = useState([])
  const [names3State, setNames3] = useState([])




  const names1JSONData = localStorage.getItem("names1")
  const parsedNames1 = JSON.parse(names1JSONData)
  const names1 = parsedNames1 ? parsedNames1 : []

  const names2JSONData = localStorage.getItem("names2")
  const parsedNames2 = JSON.parse(names2JSONData)
  const names2 = parsedNames2 ? parsedNames2 : []

  const names3JSONData = localStorage.getItem("names3")
  const parsedNames3 = JSON.parse(names3JSONData)
  const names3 = parsedNames3 ? parsedNames3 : []

  useEffect(() => {
    setNames1(names1)
    setNames2(names2)
    setNames3(names3)
  }, [])

  const handleClick1 = () => {
    const color = generateRandomColor()

    const item = {
      name:input1.current.value,
      color
    }

    if (input1.current.value) {
      names1.push(item)
      const names1JSON = JSON.stringify(names1)
      localStorage.setItem("names1", names1JSON)
      setNames1(names1)
    }

  }
  const handleClick2 = () => {
    const color = generateRandomColor()
    const item = {
      name:input2.current.value,
      color
    }
    if (input2.current.value) {
      names2.push(item)
      const names2JSON = JSON.stringify(names2)
      localStorage.setItem("names2", names2JSON)
      setNames2(names2)
    }

  }
  const handleClick3 = () => {
    const color = generateRandomColor()
    const item = {
      name:input3.current.value,
      color: color
    }

    if (input3.current.value) {
      names3.push(item)
      const names3JSON = JSON.stringify(names3)
      localStorage.setItem("names3", names3JSON)
      setNames3(names3)
    }

  }

  const dragStart1 = (e, position) => {
    dragItem1.current = position;
  };

  const dragStart2 = (e, position) => {
    dragItem2.current = position;
  };

  const drop1 = (e) => {
    const newNames1 = names1.filter((item)=> names1.indexOf(item) !== +dragItem1.current)
    const names1JSON = JSON.stringify(newNames1)
    localStorage.setItem("names1", names1JSON)
    const draggableName = names1.find((item) => names1.indexOf(item) === +dragItem1.current)
    names2.push(draggableName)
    const names2JSON=JSON.stringify(names2)
    localStorage.setItem("names2", names2JSON)
    setNames1(newNames1)
    setNames2(names2)
    
  };

  const drop2 = (e) => {
    const newNames2 = names2.filter((item)=> names2.indexOf(item) !== +dragItem2.current)
    const names2JSON = JSON.stringify(newNames2)
    localStorage.setItem("names2", names2JSON)
    const draggableName = names2.find((item) => names2.indexOf(item) === +dragItem2.current)
    names1.push(draggableName)
    const names1JSON=JSON.stringify(names1)
    localStorage.setItem("names1", names1JSON)
    setNames1(names1)
    setNames2(newNames2)
    
  };
 
  return (
    <>
      <Flex
        w="100%"
        justifyContent="space-around"
        alignItems="center"
        pt="40px"
      >
        <Box
          height="100vh"
          display="flex"
          w="420px"
          flexDirection="column"
          alignItems="center"
        >
          <Input
            placeholder='Name1'
            w="200px"
            height="30px"
            ref={input1}
          />
          <Button
            w="150px"
            height='40px'
            mt="20px"
            bgColor="black"
            border="none"
            color="white"
            onClick={handleClick1}
          >
            Submit 1
          </Button>
          {
            names1State.map((item, index) => <Box
              w="100px"
              height="100px"
              border="1px solid black"
              key={index}
              mt="30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgColor={item.color}
              onDragStart={(e) => dragStart1(e, index)}
              onDragEnd={drop1}
              draggable
            >{item.name}</Box>)

          }
        </Box>
        <Box
          height="100vh"
          w="420px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          borderRight="1px solid black"
          borderLeft="1px solid black"
        >
          <Input
            placeholder='Name2'
            w="200px"
            height="30px"
            ref={input2}
          />
          <Button
            w="150px"
            height='40px'
            mt="20px"
            bgColor="black"
            border="none"
            color="white"
            onClick={handleClick2}
          >
            Submit 2
          </Button>
          {
            names2State.map((item, index) => <Box
              w="100px"
              height="100px"
              border="1px solid black"
              key={index}
              mt="30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgColor={item.color}
              onDragStart={(e) => dragStart2(e, index)}
              onDragEnd={drop2}
              draggable
            >{item.name}</Box>)
          }
        </Box>
        <Box
          w="420px"
          height="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Input
            placeholder='Name3'
            w="200px"
            height="30px"
            ref={input3}
          />
          <Button
            w="150px"
            height='40px'
            mt="20px"
            bgColor="black"
            border="none"
            color="white"
            onClick={handleClick3}
          >
            Submit 3
          </Button>
          {
            names3State.map((item, i) => <Box
              w="100px"
              height="100px"
              border="1px solid black"
              key={i}
              mt="30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgColor={item.color}
            >{item.name}</Box>)
          }
        </Box>
      </Flex>
    </>
  );
}

export default App;

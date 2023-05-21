import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import axios from "axios";

const App = () => {
  //get
  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3333/employees");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEmployees().then((data) => setData(data));
  }, []);

  //update
  const updateEmployees = async (dataEdit) => {
    try {
      const response = await axios.put(
        "http://localhost:3333/employees",
        setDataEdit
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    updateEmployees().then((dataEdit) => setData(employees));
  }, []);

  //add
  const addEmployees = async (data) => {
    try {
      const response = await axios.post( "http://localhost:3333/employees/add", setData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    addEmployees().then((data) => setData(employees));
  }, []);
//delete
const removeEmployees = async (data) => {
    try {
      const response = await axios.delete( "http://localhost:3333/employees", setData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    removeEmployees().then((data) => setData(employees));
  }, []);



  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const handleRemove = (email) => {
    const newArray = data.filter((employees) => employees.email !== email);

    setData(newArray);

    employees.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Flex mb="8" justify="space-between" align="center">
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>
          <ModalComp
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Flex>

        <Table mt="6">
          <Thead>
            <Tr>
              <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                Nome
              </Th>
              <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                E-Mail
              </Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((employees, index) => (
              <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                <Td maxW={isMobile ? 5 : 100}>{employees.name}</Td>
                <Td maxW={isMobile ? 5 : 100}>{employees.email}</Td>
                <Td p={0}></Td>

                <Td p={0}>
                  <EditIcon
                    fontSize={20}
                    onClick={() => [
                      setDataEdit({ ...employees, index }),
                      onOpen(),
                    ]}
                  />
                </Td>
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="red"
                    leftIcon={<DeleteIcon />}
                    onClick={() => handleRemove(employees.email)}
                  >
                    Excluir
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;

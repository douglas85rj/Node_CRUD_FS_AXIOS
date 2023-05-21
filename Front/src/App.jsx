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

  const getEmployees = async () => {
    try{
    const response = await axios.get("http://localhost:3333/employees");
  return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getEmployees().then((data) => setData(data));
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
      <Box
        w="100%"
        maxWidth={1480}
        p="10"
        bg="gray.100"
        borderRadius={8}
        boxShadow="md"
      >
        <Flex mb="8" justify="space-between" align="center">
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="blue"
            leftIcon={<EditIcon />}
            onClick={onOpen}
          >
            Novo Cadastro
          </Button>
          <ModalComp

            data={data}
            setData={setData}
            dataEdit={dataEdit}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Flex>
        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Telefone</Th>
              <Th>CPF</Th>
              <Th>RG</Th>
              <Th>Endereço</Th>
              <Th>CEP</Th>
              <Th>UF</Th>
              <Th>Cidade</Th>
              <Th>Editar</Th>
              <Th>Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((employees, index) => (
              <Tr key={index}>
                <Td>{employees.name}</Td>
                <Td>{employees.email}</Td>
                <Td>{employees.phone}</Td>
                <Td>{employees.cpf}</Td>
                <Td>{employees.rg}</Td>
                <Td>{employees.address}</Td>
                <Td>{employees.cep}</Td>
                <Td>{employees.uf}</Td>
                <Td>{employees.city}</Td>
                <Td>
                  <Button

                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="blue"
                    leftIcon={<EditIcon />}
                    onClick={() => {
                      onOpen();
                      setDataEdit({ ...employees, index });
                    } 
                  }
                  >
                    Editar
                  </Button>
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
    </Flex>
  );
};

export default App;





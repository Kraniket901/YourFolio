import Layout from "@/components/Layout";
import axios from "axios";
import { useSession ,signOut} from "next-auth/react";
import Link from "next/link";
import Logo from "./yourportfolio.png"
import { React, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Row,
  Table,
  Text,
  Tooltip,
  styled,
  Navbar
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon, IconButton } from "@/components/Icons";
import { useRouter } from "next/router";
import Portfolio2 from "./portfolio2/Portfolio2";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  function handleSubmit(event) {
    event.preventDefault();
    setVisible(false);
    router.push(`?u=${username}`);
  }

  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  if (router.query.u) {
    return <Portfolio2 username={router.query.u} />;
  }else{
  return (
    <Layout>
      <Navbar  variant="sticky" className="mb-4">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            YourFolio
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
         
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
          <button
            className={"bg-white p-2 px-4 rounded-lg"}
            onClick={async () => {
              await signOut();
            }}
          >
            Logout
          </button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>  
      <div className="front-page">
        <div className="front-btn-div">
          <div>
            <Link href="/products/new">
              <Button color="success" auto ghost>
                Add New Portfolio
              </Button>
            </Link>
          </div>
          <div>
            <Button color="success" onPress={handler} auto ghost>
              Import from Github
            </Button>
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <form onSubmit={handleSubmit}>
                <Modal.Header>
                  <Text id="modal-title" size={18}>
                    Enter Your &nbsp;
                    <Text b size={18}>
                      GitHub Username
                    </Text>
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Github Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button auto flat color="error" onPress={closeHandler}>
                    Close
                  </Button>
                  <Button auto type="submit">
                    Submit
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
        <Table
          bordered
          headerLined
          Lined
          //   lineWeight="normal"
          borderWeight="extrabold"
          color="primary"
          shadow={false}
          aria-label="Example static bordered collection table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>NAME</Table.Column>
            <Table.Column width="15%">VIEW PORTFOLIO</Table.Column>
            <Table.Column width="15%">EDIT</Table.Column>
            <Table.Column width="15%">DElETE</Table.Column>
          </Table.Header>
          <Table.Body>
            {products.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell className>
                  <div className="text-white">
                    {product.name}&apos;s Portfolio
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Tooltip content="View Portfolio">
                    <IconButton>
                      <Link href={"/portfolio/" + product._id}>
                        <EyeIcon size={20} fill="#979797" />
                      </Link>
                    </IconButton>
                  </Tooltip>
                </Table.Cell>
                <Table.Cell>
                  <Tooltip content="Edit Portfolio Content">
                    <IconButton>
                      <Link href={"/products/edit/" + product._id}>
                        <EditIcon size={20} fill="#787ef7" />
                      </Link>
                    </IconButton>
                  </Tooltip>
                </Table.Cell>
                <Table.Cell>
                  <Tooltip content="Delete Portfolio" color="error">
                    <IconButton>
                      <Link href={"/products/delete/" + product._id}>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </Link>
                    </IconButton>
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Layout>
  );
  }
}

import {
  Input,
  InputNumber,
  Divider,
  Image,
  Menu,
  message,
  Modal,
  Rate,
  Skeleton,
  Spin,
  Table,
  Select,
  Tooltip,
  Typography,
  Form,
  Space,
} from "antd";


import type { InputRef } from 'antd';
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

import { SearchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './App.css';
import { Button } from "react-bootstrap"

import React, { useEffect, useState, useRef } from 'react';
//import { localStorage } from "window";
import { BsTrash, BsEye, BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import { Link } from 'react-router-dom';
import './index.css';
interface NumericInputProps {
  style: React.CSSProperties;
  value: any;
  onChange: (value: any) => void;
}
const { TextArea } = Input;

interface Product {
  id: any;
  title: any;
  price: any;
  description: any;
  Catego: any;
  image: any;
  rating: any;

}
interface Category {
  id: any;
  title: any;
  image: any;
  userid: any;


}
interface DataType {
  key: string;
  name: string;
  price_tag: number;
}

type DataIndex = keyof DataType;

function App() {

  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const [IsUpdate, setIsupdate] = useState(false);
  const [Isadded, setIsadded] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditingModal, setEditingModal] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [CategoryModal, setCategoModal] = useState(false);
  const [singleP, setSingleP] = useState<any>({});
  const [singleC, setSingleC] = useState<any>({});
  const [category, setCategory] = useState("");
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [Catego, setCatego] = useState("");
  const [image, setImage] = useState("");
  const [Categ, setCateg] = useState([]);
  const [selectedItem, setSelectedItem] = useState("karma ");
  const [username, setUsername] = useState("");
  const [Userid, setUserId] = useState(0);
  const [categTitle, setCategtitle] = useState("");
  const storedUserData = localStorage.getItem('userData');
  const [categoryTitles, setCategoTitles] = useState({});


  useEffect(() => {
    fetchData();
  }, []);

  const logout = async () => {
    localStorage.removeItem('userData');
    window.location.href = '/';

  }
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/Category'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }
      const data = await response.json();
      setCateg(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
    setCatego(value);
  };

  const fetchCateg = async (id) => {
    fetch(`http://localhost:5000/Category`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(json => {
        setSingleC(json);
      })
      .catch(error => {
        console.error('Error fetching category titles:', error);
      });
  };
  useEffect(() => {
    setTitle(singleP?.title || "");
    setPrice(singleP?.price || 0);
    setDescription(singleP?.description || "");
    setCatego(singleP?.Catego || "");
    setImage(singleP?.image || "");
  }, [singleP]);
  const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

  const NumericInput = (props: NumericInputProps) => {
    const { value, onChange } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
        onChange(inputValue);
      }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
      let valueTemp = value;
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };

    const title = value ? (
      <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
      'Input a number'
    );

    return (
      <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
        <Input
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Input a number"
          maxLength={16}
        />
      </Tooltip>
    );
  };
  const DeleteHandler = async (id) => {
    try {
      const deleteProd = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      await setProduct(product.filter((p) => p.id != id));
      message.success("Product Deleted");
    } catch (err) {
      console.error(err.message);
    }
  };
  const FetchSingleProduct = (id) => {
    axios.get(`http://localhost:5000/todos/${id}`).then((res) => {
      setSingleP(res.data);

    });
  };
  const onEditProduct = async (e) => {
    try {
      const body = { id, title, price, description, Catego, image };
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
      );
      console.log("yay it been added ");
      setIsupdate(!IsUpdate);
      handleEditClose();
    } catch (err) {
      console.log("nope something wrong happend");
      console.error(err.message);
    }

  };
  const onSubmitForm = async e => {
    try {
      const categoryAsString = Catego.toString();

      const body = { title, price, description, categoryAsString, image };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      setIsadded(!Isadded);
      handleClose();

      setPrice(0);

      setCatego("");

    } catch (err) {
      console.log("nope something wrong happend");
      console.error(err.message);
    }
  };
  const handlePriceChange = (value: string) => {
    setPrice(parseFloat(value));
  };
  const { Title } = Typography;
  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
      .then((json) => setProduct(json));

  }, [IsUpdate, Isadded]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSingleP({});
  };
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleCategory = () => {
    setCategoModal(true);
  };
  const handleCloseCatg = () => {
    setCategoModal(false);
    setSingleP({});
  };
  const handleClose = () => {
    setOpenModal(false);
    setSingleP({});
  };
  const handleOpenEdit = () => {
    setEditingModal(true);
  };

  const handleEditClose = () => {
    setEditingModal(false);
    setSingleP({});
  };
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            variant="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            size="sm"
            style={{ width: 90 }}
          >{<SearchOutlined />}
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="sm"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

  });

  const columns = [

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('name'),

    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ...getColumnSearchProps('price_tag'),

    },
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'category',
      ...getColumnSearchProps('name'),


    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => {
        return <Image width={100} src={record?.image} />;

      }
    },

    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (_, { id }) => {
        return (
          <>
            <BsTrash
              style={{ fontSize: "30px", color: "red", cursor: "pointer" }}
              onClick={() => DeleteHandler(id)}

            />
            <BsEye
              style={{ fontSize: "30px", color: "teal", cursor: "pointer" }}
              onClick={() => {
                showModal();
                FetchSingleProduct(id);
              }
              }

            />
            <BsPencilSquare style={{ fontSize: "30px", color: "black", cursor: "pointer" }}
              onClick={() => {
                setId(id);
                handleOpenEdit();
                FetchSingleProduct(id);
              }
              } />
          </>
        );
      },
    },
  ];
  const onChange = (value: number) => {
    setPrice(value);
  };
  const tableProps: TableProps<DataType> = {
    bordered: true,
    size: "large",
    showHeader: true,

    tableLayout: "fixed",
  };
  return (
    <Space size="large" direction="vertical">
      <div className="d-flex justify-content-end">

        <Button

          variant="outline-dark" size="lg" style={{ marginRight: 20 }} onClick={() => {
            handleOpen();
          }} >Add</Button>
      </div>
      {product.length ? (
        <Table {...tableProps} dataSource={product} columns={columns} pagination={{
          pageSize: 5,
        }}
        />
      ) : (
        <Skeleton />
      )}

      <Modal
        title="Detail Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {singleP?.id ? (
          <>
            <p>
              <div style={{ display: "flex" }}>
                <img src={singleP?.image} width="200px" />
                <div style={{ flexDirection: "column" }}>
                  <Title level={1}>{`${singleP?.price}$`}</Title>

                </div>
              </div>
            </p>
            <Divider />
            <p>
              <Title level={2}>{singleP?.title}</Title>
            </p>
            <p>
              <Title level={4}>{singleP?.Catego}</Title>
            </p>
            <p>{singleP?.description}</p>
          </>
        ) : (
          <Spin size="large" />
        )}
      </Modal>
      <Modal
        title="Add Product"
        open={OpenModal}
        onCancel={handleClose}
        footer={null}
      >
        {<Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{
            alignItems: 'center',
            marginTop: 32
          }}
          onFinish={onSubmitForm}
        >
          <Form.Item label="Title" required	 >
            <Input size='large' placeholder='Product Name ' value={title}
              onChange={e => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Price" required	>
            <InputNumber
              size="large" onChange={onChange}
            />
          </Form.Item>
          <Form.Item label="Description" required	>
            <TextArea rows={2} size='large' value={description}
              onChange={e => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item label="Category" required	>
            <Select placeholder="tests" defaultValue={Catego}
              onChange={handleSelectChange} options={Categ.map((item) => ({
                value: item.id,
                label: item.name,
              }))} />


          </Form.Item>
          <Form.Item label="Upload Image " required 	>
            <Input size='large' placeholder='Image Link ' value={image}
              onChange={e => setImage(e.target.value)} />
          </Form.Item>


          <Form.Item >
            <Button variant="outline-primary" type="submit" style={{ width: '100%' }}  >
              Add Product
            </Button>
          </Form.Item>

        </Form >}
      </Modal>
      <Modal
        title="Edit Product"
        open={EditingModal}
        onCancel={handleEditClose}
        footer={null}

      >
        {singleP?.id ? (
          <>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{
                alignItems: 'center',
                marginTop: 32
              }}
              onFinish={onEditProduct}
              initialValues={{  // Set initial values for form fields
                title: singleP?.title || "",
                price: singleP?.price || 0,
                description: singleP?.description || "",
                Catego: singleP?.Catego || "",
                image: singleP?.image || "",
              }}

            >
              <Form.Item label="Title" required	 >
                <Input size='large' placeholder='Product Name ' value={title}
                  onChange={e => setTitle(e.target.value)} />
              </Form.Item>
              <Form.Item label="Price" required	>

                <InputNumber
                  value={price}
                  size="large" onChange={onChange}
                />
              </Form.Item>
              <Form.Item label="Description" required	>
                <TextArea rows={5} size='large' value={description}
                  onChange={e => setDescription(e.target.value)} />
              </Form.Item>
              <Form.Item label="Category" required	>
                <Select placeholder="tests" defaultValue={Catego}
                  onChange={handleSelectChange} options={Categ.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))} />
              </Form.Item>
              <Form.Item label="Upload Image " required 	>
                <Input size='large' placeholder='Image Link ' value={image}
                  onChange={e => setImage(e.target.value)} />
              </Form.Item>


              <Form.Item >
                <Button variant="outline-primary" type="submit" style={{ width: '100%' }}  >
                  Edit Product
                </Button>
              </Form.Item>

            </Form >
          </>
        ) : (
          <Spin size="large" />
        )}
      </Modal>


    </Space>
  );
}

export default App;

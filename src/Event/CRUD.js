

import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Table, Popconfirm, Typography, message, Button } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
          initialValue={record[dataIndex]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

EditableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  record: PropTypes.object,
  index: PropTypes.number,
  children: PropTypes.node,
};

const EventManagement = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];

        // Update the event on the server
        await axios.put(`http://localhost:5000/events/update/${key}`, row);

        // Update the local state with the updated event
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        setData(newData);
        setEditingKey('');
        message.success('Event updated successfully!');
      } else {
        console.log('Addition not handled in this example');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const handleDelete = async (key) => {
    try {
      // Delete the event on the server
      await axios.delete(`http://localhost:5000/events/delete/${key}`);

      // Update the local state by removing the deleted event
      setData((prevData) => prevData.filter((item) => item.key !== key));
      message.success('Event deleted successfully!');
    } catch (error) {
      console.error('Failed to delete event:', error);
      message.error('Failed to delete event');
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'date',
      dataIndex: 'date',
      width: '15%',
      editable: true,
    },
    {
      title: 'location',
      dataIndex: 'location',
      width: '40%',
      editable: true,
    },
    {
      title: 'description',
      dataIndex: 'description',
      width: '40%',
      editable: true,
    },
    {
      title: 'price',
      dataIndex: 'price',
      width: '15%',
      editable: true,
    },
    {
      title: 'nbrPlaces',
      dataIndex: 'nbrPlaces',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
              disabled={editingKey !== ''}
            >
              <a style={{ marginLeft: 8, color: 'red' }}>Delete</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'date' || col.dataIndex === 'price' || col.dataIndex === 'nbrPlaces' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });



  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setData(response.data.map((event) => ({ ...event, key: event._id })));
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* Button to navigate to the Add Event page */}
      <Button type="primary"  style={{ marginBottom: 16 }}>
      <Link to="/addEvent">Go to Add Event Page</Link>
      </Button>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </div>
  );
};

export default EventManagement;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import {
//     Input,
//     InputNumber,
//     Divider,
//     Button,
//     message,
//     Modal,
//     Skeleton,
//     Table,
//     Typography,
//     Form,
//     Space,
//   } from "antd";
//   import { BsTrash, BsEye, BsPencilSquare } from "react-icons/bs";


// function Crud() {
//     const { TextArea } = Input;

//     const [events, setEvents] = useState([]);
//     const [IsUpdate, setIsupdate] = useState(false);
//     const [Isadded, setIsadded] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [EditingModal, setEditingModal] = useState(false);
//     const [OpenModal, setOpenModal] = useState(false);
//     const [singleP, setSingleP] = useState({});
//     const [idEv, setIdEv] = useState(0);
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState();
//     const [price, setPrice] = useState("");
//     const [nbrPlaces, setNbrPlaces] = useState("");
//     const [location, setLocation] = useState("");
//     const [eventdate, seteventdate] = useState("");
//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setSingleP({});
//       };
  
//       const handleOpen = () => {
//         setOpenModal(true);
//       };

//       const handleClose = () => {
//         setOpenModal(false);
//         setSingleP({});
//       };
//       const handleOpenEdit = () => {
//         setEditingModal(true);
//       };
    
//       const handleEditClose = () => {
//         setEditingModal(false);
//         setSingleP({});
//       };
//     const fetchData = async () => {
//         try {
//           const response = await fetch('http://localhost:5000/events'); // Replace with your API endpoint
//           if (!response.ok) {
//             throw new Error('Failed to fetch data.');
//           }
//           const data = await response.json();
//           console.log(data) ;

//           setEvents(data);
//         } catch (error) {
//           console.error(error);
//         }
//       }
      
//   const DeleteHandler = async (idS) => {
//     try {

//         const deleteProd = await axios.delete(`http://localhost:5000/events/delete/${idS._id}`); // eslint-disable-line no-underscore-dangle
//         if (!deleteProd.ok) {
//         throw new Error('Failed to fetch data.');
//       }
//       await setEvents(events.filter((p) => p.id !== idS));// eslint-disable-line no-underscore-dangle
//       message.success("event Deleted");
//     } catch (err) {
//       console.error(err.message);
//     }
//   };
//   /* eslint-disable no-underscore-dangle */

//   const FetchSingleProduct = (idS) => {
//     axios.get(`http://localhost:5000/events/${idS._id}`).then((res) => {
//       setSingleP(res.data);

//     });/* eslint-enable no-underscore-dangle */

//   };
//   const onEditProduct = async () => {
//     try {
//       const body = { idEv, name, eventdate, location, description, price, nbrPlaces };
//       const response = await axios.put(`http://localhost:5000/events/update/${idEv}`, body
//       );
//       if (response.status === 200) {

//       console.log("yay it been added ");
//       setIsupdate(!IsUpdate);
//       handleEditClose();}
//     } catch (err) {
//       console.log("nope something wrong happend");
//       console.error(err.message);
//     }

//   };
//   const onSubmitForm = async (formValues) => {
//     const body = { ...formValues };
  
//     try {
//       const response = await fetch("http://localhost:5000/events/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
  
//       if (response.ok) {
//         console.log("Event added successfully");
//         setIsadded(!Isadded);
//         handleClose();
  
//         // Reset form fields to their initial state
//         setName("");
//         setLocation("");
//         setDescription("");
//         setPrice(0);
//         setNbrPlaces(0);
//         seteventdate("");
  
//         message.success("Event Added Successfully");
//       } else {
//         console.error("Failed to add event");
//       }
//     } catch (error) {
//       console.error("Error adding event:", error);
//     }
//   };
  
//     useEffect(() => {
//         fetchData();
//       }, []);
//       useEffect(() => {
//         fetch('http://localhost:5000/events')
//           .then(res => res.json())
//           .then((json) => setEvents(json));
    
//       }, [IsUpdate, Isadded]);
//       useEffect(() => {
//         setName(singleP?.name || "");
//         setLocation(singleP?.location || 0);
//         setDescription(singleP?.description || "");
//         setPrice(singleP?.price || "");
//         setNbrPlaces(singleP?.nbrPlaces || "");
//         seteventdate(singleP?.date || "");
//       }, [singleP]);
//       const showModal = () => {
//         setIsModalOpen(true);
//       };
    
// const { Title } = Typography;

// const columns = [
//   {
//     title: 'Event Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Location',
//     dataIndex: 'location',
//     key: 'location',
//   },
//   {
//     title: 'Description',
//     dataIndex: 'description',
//     key: 'description',
//   },
//   {
//     title: 'Date',
//     dataIndex: 'date',
//     key: 'date',
//   },
//   {
//     title: 'Price',
//     dataIndex: 'price',
//     key: 'price',
//   },
//   {
//     title: 'Number of places',
//     dataIndex: 'nbrPlaces',
//     key: 'nbrPlaces',
//   },
  

//    {
//       title: 'Actions',
//       dataIndex: 'id',
//       key: 'id',
//       render: (_,  id ) => {
//         return (
//           <>
//             <BsTrash
//               style={{ fontSize: "30px", color: "red", cursor: "pointer" }}
//               onClick={() =>{
//                 console.log(id) ;
//                  DeleteHandler(id) ;
//                 }}

//             />
//             <BsEye
//               style={{ fontSize: "30px", color: "teal", cursor: "pointer" }}
//               onClick={() => {
//                 console.log(id)
//                 showModal();
//                 FetchSingleProduct(id);
//               }
//               }

//             />
//             <BsPencilSquare style={{ fontSize: "30px", color: "black", cursor: "pointer" }}
//               onClick={() => {
//                 setIdEv(id);
//                 handleOpenEdit();
//                 FetchSingleProduct(id);
//               }
//               } />
//           </>
//         );
//       },
//     },
// ];

// const tableProps = {
//     bordered: true,
//     size: "large",
//     showHeader: true,

//     tableLayout: "fixed",
//   };
//   const onChange = (value) => {
//     setPrice(value);
//   };
//   const onChangeNbr = (value) => {
//     setNbrPlaces(value);
//   };
// return( <>

// <Space size="large" direction="vertical">
//       <div className="d-flex justify-content-end">

//         <Button

//           variant="outline-dark" size="lg" style={{ marginRight: 20 }} onClick={() => {
//             handleOpen();

//           }} >Add</Button>
//       </div>
//       {events.length ? (
//         <Table         {...tableProps}        dataSource={events} columns={columns} pagination={{
//           pageSize: 5,
//         }}
//         />
//       ) : (
//         <Skeleton />
//       )}
//        <Modal
//         title="Detail Product"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//       >
      
//             <p>
//               <div style={{ display: "flex" }}>
//                 <div style={{ flexDirection: "column" }}>
//                   <Title level={1}>{`${singleP?.price}$`}</Title>

//                 </div>
//               </div>
//             </p>
//             <Divider />
//             <p>
//               <Title level={2}>{singleP?.name}</Title>
//             </p>
//             <p>
//               <Title level={4}>{singleP?.nbrPlaces}</Title>
//             </p>
//             <p>
//               <Title level={2}>{singleP?.location}</Title>
//             </p>
//             <p>
//               <Title level={2}>{singleP?.eventdate}</Title>
//             </p>
//             <p>{singleP?.description}</p>
        
//       </Modal>
//       <Modal
//         title="Add Event"
//         open={OpenModal}
//         onCancel={handleClose}
//         footer={null}
//       >
//         <Form
//           labelCol={{ span: 4 }}
//           wrapperCol={{ span: 14 }}
//           layout="horizontal"
//           style={{
//             alignItems: 'center',
//             marginTop: 32
//           }}
//           onFinish={(formValues) => onSubmitForm(formValues)}
//         >
//           <Form.Item label="Event Name" required	 >
//             <Input size='large' placeholder='Product Name ' value={name}
//               onChange={e => setName(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Location" required	 >
//             <Input size='large' placeholder='Product Name ' value={location}
//               onChange={e => setLocation(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Description" required	>
//             <TextArea rows={2} size='large' value={description}
//               onChange={e => setDescription(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Price" required	 >
//           <InputNumber
//               size="large" onChange={onChange}
//             />
//           </Form.Item>
//           <Form.Item label="Nombre Place" required	>
//             <InputNumber
//               size="large" onChange={onChangeNbr}
//             />
//           </Form.Item>
       


//           <Form.Item >
//             <Button variant="outline-primary" type="submit" style={{ width: '100%' }}  >
//               Add Event
//             </Button>
//           </Form.Item>

//         </Form >
//       </Modal>
//       <Modal
//         title="Edit Product"
//         open={EditingModal}
//         onCancel={handleEditClose}
//         footer={null}

//       >
    
//             <Form
//               labelCol={{ span: 4 }}
//               wrapperCol={{ span: 14 }}
//               layout="horizontal"
//               style={{
//                 alignItems: 'center',
//                 marginTop: 32
//               }}
//               onFinish={onEditProduct}
//               initialValues={{  // Set initial values for form fields
//                 name: singleP?.name || "",
//                 price: singleP?.price || 0,
//                 description: singleP?.description || "",
//                 location: singleP?.location || "",
//                 date: singleP?.date || "",
//                 nbrPlaces: singleP?.nbrPlaces || 0,
//               }}
        
//             >
                        
//           <Form.Item label="Title" required	 >
//             <Input size='large' placeholder='Product Name ' value={name}
//               onChange={e => setName(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Price" required	>
//             <InputNumber
//               size="large" onChange={onChange}
//             />
//           </Form.Item>
//           <Form.Item label="Description" required	>
//             <TextArea rows={2} size='large' value={description}
//               onChange={e => setDescription(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Location" required	 >
//             <Input size='large' placeholder='Product Name ' value={location}
//               onChange={e => setLocation(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Nombre Place" required	>
//             <InputNumber
//               size="large" onChange={onChangeNbr}
//             />
//           </Form.Item>
       

//               <Form.Item >
//                 <Button variant="outline-primary" type="submit" style={{ width: '100%' }}  >
//                   Edit Product
//                 </Button>
//               </Form.Item>

//             </Form >
        
//       </Modal>


// </Space>
// </>
// );
// }
// export default Crud ;
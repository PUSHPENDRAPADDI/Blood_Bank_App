import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
import Layout from '../components/shared/Layout/Layout';
import Modal from '../components/shared/modal/Modal';
import API from '../services/api';
import moment from 'moment'

const HomePage = () => {
  const { loading, error } = useSelector(state => state.auth);
  const [data, setData] = useState([]);

  // get Data
  const getBloodrecoreds = async () => {
    try {
      const { data } = await API.get('./inventory/get-inventory')
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBloodrecoreds()
  }, [])


  return (
    <Layout>
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            <h4 className='m-4'
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className='fa-solid fa-plus text-success py-4'></i>
              Add Inventory
            </h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventroy Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map(record => {
                  return (
                    <tr key={record._id}>
                      <td>{record.bloodGroup}</td>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity} ( ML)</td>
                      <td>{record.donarEmail}</td>
                      <td>{moment(record.createdAt).format('DD/MM/YYYY HH:MM A')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <Modal />
        </>
      )
      }
    </Layout>
  )
}

export default HomePage
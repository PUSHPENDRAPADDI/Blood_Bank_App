import React from 'react';
import { useSelector } from 'react-redux'
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
import Layout from '../components/shared/Layout/Layout';

const HomePage = () => {
  const { loading, error } = useSelector(state => state.auth);
  return (
    <Layout>
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <div>Home</div>
      )
      }
    </Layout>
  )
}

export default HomePage
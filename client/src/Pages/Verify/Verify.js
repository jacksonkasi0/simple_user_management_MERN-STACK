import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

const Verify = () => {
  const { token } = useParams();

  const [verify, setVerify] = useState('verifying...');

  useEffect(() => {
    axios
      .get('/api/user/verification', {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setVerify(res.data.message);
      })
      .catch((err) => {
        setVerify(err.message);
      });
  }, [token]);

  return (
    <div>
      <h1>{verify}</h1>
    </div>
  );
};

export default Verify;

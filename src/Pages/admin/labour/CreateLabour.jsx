import React, { useState } from 'react'
import Admin_Header from '../Components/Admin_Header';
import toast from 'react-hot-toast';
import axios from 'axios';
import { url } from '../../../Components/backend_link/data';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateLabour = () => {

    
    const [labor, setLabor] = useState({
        name: "",
        imageLink: "",
      });
    
      const [loading, setLoading] = useState(false);

      const auth = useSelector((state) => state.auth);

      const navigate = useNavigate();

      const handleChange = (e) => {
        setLabor({
          ...labor,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

            try {
                const res = await axios.post(`${url}/api/v2/labour/create-labour`, {
                    name: labor.name,
                    image: labor.imageLink
                },
                {
                    headers:{
                        Authorization:auth.token
                    }
                }
            )

            console.log(res.data)

            if(res.data){
                toast.success(res.data.message);
                setLabor({
                    name: "",
                    imageLink: "",
                })

                navigate('/dashboard/admin/labour-list')
                setLoading(false)
            }

                
            } catch (error) {
                toast.error(res.data.message);    
                setLoading(false)          
            }
      };

  return (
    <>
    <Admin_Header/>
     <div className="container mt-5 p-5">
      <h3 className="mb-4 text-center">Add Labor</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={labor.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageLink" className="form-label">
            Image Link
          </label>
          <input
            type="text"
            className="form-control"
            id="imageLink"
            name="imageLink"
            value={labor.imageLink}
            onChange={handleChange}
            required
          />
        </div>

            <div className='text-center'>
            <button type="submit" className="btn btn-primary">
            {
                loading ? "Loading.." : "Create"
            }
        </button>
            </div>
      </form>
    </div>
    </>
  )
}

export default CreateLabour
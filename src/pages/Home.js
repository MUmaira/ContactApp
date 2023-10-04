import React, {useState, useEffect} from 'react'
import fireDb from '../firebase'
import { Link } from 'react-router-dom'
import './Home.css'
import { toast } from 'react-toastify'

const Home = () => {

  const[data, setData] = useState({});
  useEffect(()=>{
    fireDb.child("contacts").on("value", (snapshot) => {
      if(snapshot.val() !== null){
          setData({...snapshot.val() });
      }else{
        setData({});
      }
    } )

    return () =>{
      setData({})
    }
  }, [])

  const OnDelete = (id) =>{
    if(window.confirm("Are sure you want to delete? ")){
      fireDb.child(`contacts/${id}`).remove((err) =>{
        if(err){
          toast.error(err)
        }else{
          toast.warning("Contact has been deleted")
        }
      })
    }
  }
 
  return (
    <div style={{marginTop:"100px"}}>
      <table className='styled-table'>
            <thead>
              <tr>
                <th style={{textAlign:"center"}}>No</th>
                <th style={{textAlign:"center"}}>Name</th>
                <th style={{textAlign:"center"}}>Email</th>
                <th style={{textAlign:"center"}}>Contact</th>
                <th style={{textAlign:"center"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id,index) => {
                return(
                  <tr key={id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                    <td>
                      <Link to={`/update/${id}`}>
                        <button className='btn btn-edit'>Edit</button>
                      </Link>
                      <button className='btn btn-delete' onClick={()=> OnDelete(id)}>Delete</button>
                      <Link to={`/view/${id}`}>
                        <button className='btn btn-view'>View</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
      </table>
    </div>
  )
}

export default Home

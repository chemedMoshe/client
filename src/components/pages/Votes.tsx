import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { fetchCandidates } from '../../redux/Slices/candidatesSlice';
import { fetchVotes, hasVoted } from '../../redux/Slices/userSlice';
import { socket } from '../../main';
import { useDispatch } from 'react-redux';

export default function Votes() {
  const dispatch = useAppDispatch();
  const d = useDispatch()
  const { candidates } = useAppSelector((state) => state.candidates)
  const {user} = useAppSelector((state) => state.user)
  const navigate = useNavigate()
 
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login') 
     dispatch(fetchCandidates()) 
    }, [])
  
    useEffect(() => {
      socket.on('newDataHasAccord',()=>{
        console.log('newDataHasAccord');
        dispatch(fetchCandidates())
        console.log(12);
        
      })
    },[])
  return (
    <div className='grid'>
      {candidates?.map((x: any) => (
        
        <div key={x._id} className='card'>
          <h2>{x.name}</h2>
          <img src={x.image} alt="" />
          <h3 className='points'>{x.voted}</h3>
          <button
          disabled={user?.hasVoted}
           onClick={() =>{
            d(hasVoted())
            dispatch(fetchVotes({user:x._id,can: user!._id}))
            .then(()=> dispatch(fetchCandidates()))
            socket.emit('newVote')
            
          }}
            >Vote</button>
        </div>
      ))}
    </div>
  )
}

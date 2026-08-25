import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import type { LoginData,RegisterData,AuthState } from "./authTypes"

const API_URI=import.meta.env.VITE_API_URL


const registerUser=createAsyncThunk("auth/registerUser",async(userData,thunkAPI)=>{
    try{
const response=await axios.post(`${API_URI}/register`,userData)
return response.data
    }catch(error){
return thunkAPI.rejectWithValue(error)
    }
})
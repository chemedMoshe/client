import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { candidateState, DataStatus } from "../../Types/redux";



const initialState: candidateState = {
    error: undefined,
    status: DataStatus.IDLE,
    candidates: []
}

export const fetchCandidates = createAsyncThunk('candidate/list',
    async (_, thunkApi) => {
        try {
            const res: Response = await fetch('http://localhost:2222/api/candidates', {

                headers: { authorization: localStorage.getItem('token')! },

            })
            if (!res.ok) {
              return  thunkApi.rejectWithValue('Cannot get a list, please try again')
            }
            const data = await res.json()
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
           return thunkApi.rejectWithValue('Cannot get a list, please try again')
        }
    }
)




const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<candidateState>) => {
        builder.addCase(fetchCandidates.pending, (state, action) => {
            state.status = DataStatus.LOADING
            state.error = undefined
            
        })
            .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<[]>) => {
                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.candidates = action.payload
            })
            .addCase(fetchCandidates.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.candidates = []
            })

    }
})

export default candidatesSlice

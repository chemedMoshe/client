import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataStatus, userState } from "../../Types/redux";
import { IUser } from "../../Types/User";



const initialData: userState = {
    error: undefined,
    status: DataStatus.IDLE,
    user: null
}

export const fetchLogin = createAsyncThunk('user/login',
    async (user: { username: string, password: string }, thunkApi) => {
        try {
            const res: Response = await fetch('http://localhost:2222/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    user
                )
            })
            if (!res.ok) {
                return thunkApi.rejectWithValue('Cannot login, please try again')
            }
            const data = await res.json()

            localStorage.setItem('token', data.token)

            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue('Cannot login, please try again')
        }
    }
)

export const fetchRegister = createAsyncThunk('user/register',
    async (user: { username: string, password: string, isAdmin: boolean }, thunkApi) => {
        try {
            const res: Response = await fetch('http://localhost:2222/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            if (!res.ok) {
                thunkApi.rejectWithValue('Cannot register, please try again')
            }
            const data = await res.json()
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            thunkApi.rejectWithValue('Cannot register, please try again')
        }
    }
)


export const fetchVotes = createAsyncThunk('user/votes',
    async (ids: any, thunkApi) => {
        console.log(JSON.stringify({ userid: ids?.user, candidateid: ids?.can }))
        try {
            const res: Response = await fetch('http://localhost:2222/api/votes/add', {
                method: 'POST',
                headers: { authorization: localStorage.getItem('token')!, 'Content-Type': 'application/json' },
                body: JSON.stringify({ userid: ids?.user, candidateid: ids?.can })

            })
            if (!res.ok) {
                return thunkApi.rejectWithValue('Cannot get votes, please try again')
            }
            const data = await res.json()
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue('Cannot get votes, please try again')
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialData,
    reducers: {
        hasVoted: (state: userState) => {
            state.user!.hasVoted = true
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
        builder.addCase(fetchLogin.pending, (state, action) => {
            state.status = DataStatus.LOADING
            state.error = undefined
            state.user = null
        })
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.user = action.payload as unknown as IUser
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.user = null
            })
            .addCase(fetchRegister.pending, (state, action) => {
                state.status = DataStatus.LOADING
                state.error = undefined
                state.user = null
            })
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.user = action.payload as unknown as IUser
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string

            })
            .addCase(fetchVotes.pending, (state, action) => {
                state.status = DataStatus.LOADING
                state.error = undefined

            })
            .addCase(fetchVotes.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.user!.hasVoted = true
            })
            .addCase(fetchVotes.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string

            })

    }


})

export default userSlice
export const  {hasVoted} = userSlice.actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useFetch } from 'hooks/fetch-hook';
import { ListMedicineResponse } from 'types/slice';

export const listMedicine = createAsyncThunk('list_medicine', async (_, { rejectWithValue }) => {
  try {
    const { data, statusCode, message } = useFetch<ListMedicineResponse>({
      url: '/v1/medications',
    });

    if (statusCode !== 200) throw message;

    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

interface ListMedicineState {
  data: ListMedicineResponse | [];
  loading: true | false;
  error: string | null;
}

const initialState: ListMedicineState = {
  data: [],
  loading: true,
  error: null,
};

const listMedicineSlice = createSlice({
  name: 'listMedicine',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(listMedicine.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(listMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(listMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default listMedicineSlice.reducer;

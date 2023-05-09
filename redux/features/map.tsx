import { DrawCoords } from '@/types/models/drawCoords.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDraw {
  drawInfo: { time: string; dist: string };
  drawCoords: DrawCoords[];
  exportCoords: DrawCoords[];
  drawCoordsDeleted: DrawCoords[];
  drawCoordsFuture: DrawCoords[];
}

const initialState: IDraw = {
  drawInfo: { time: '0000', dist: '0000' }, // Value that displayed on Details section
  drawCoords: [], // Coords that used for rendering Markers & polyline
  exportCoords: [], // Coords that are saved under the hood and user can export them
  drawCoordsDeleted: [], // Coords that are deleted
  drawCoordsFuture: [], // Coords that can be recovered
};

export const draw = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    updateExportCoords: (state, action) => {
      return {
        ...state,
        exportCoords: action.payload,
      };
    },
    updateDrawInfo: (
      state,
      action: PayloadAction<{ time: string; dist: string }>
    ) => {
      return {
        ...state,
        drawInfo: {
          ...state.drawInfo,
          time: action.payload.time,
          dist: action.payload.dist,
        },
      };
    },
    updateDrawCoords: (state, action: PayloadAction<DrawCoords>) => {
      return {
        ...state,
        drawCoords: [
          ...state.drawCoords,
          {
            lat: action.payload.lat,
            lng: action.payload.lng,
          },
        ],
        drawCoordsDeleted: [],
        drawCoordsFuture: [],
      };
    },
    undoDrawCoords: (state, index) => {
      if (state.drawCoords.length === 0) return;
      if (state.drawCoords.length !== 0) {
        return {
          ...state,
          drawCoordsFuture: [
            ...state.drawCoordsFuture,
            ...state.drawCoords.slice(-1),
          ],
          drawCoords: state.drawCoords.filter(
            (item, index) => index !== state.drawCoords.length - 1
          ),
        };
      }
    },
    redoDrawCoords: (state, index) => {
      if (state.drawCoordsDeleted.length === 0) {
        return {
          ...state,
          drawCoords: [
            ...state.drawCoords,
            ...state.drawCoordsFuture.slice(-1),
          ],
          drawCoordsFuture: [
            ...state.drawCoordsFuture.filter(
              (item, index) => index !== state.drawCoordsFuture.length - 1
            ),
          ],
        };
      } else if (
        state.drawCoordsFuture.length === 0 &&
        state.drawCoordsDeleted.length > 0
      ) {
        return {
          ...state,
          drawCoords: [...state.drawCoordsDeleted],
          drawCoordsDeleted: [],
        };
      }
    },
    deleteDrawCoords: (state, index) => {
      if (state.drawCoords.length === 0) return;
      if (state.drawCoords.length !== 0) {
        return {
          ...state,
          drawCoordsDeleted: [...state.drawCoords],
          drawCoords: [],
          drawCoordsFuture: [],
          exportCoords: [],
        };
      }
    },
  },
});

export const {
  updateDrawInfo,
  updateDrawCoords,
  deleteDrawCoords,
  undoDrawCoords,
  redoDrawCoords,
  updateExportCoords,
} = draw.actions;
export default draw.reducer;

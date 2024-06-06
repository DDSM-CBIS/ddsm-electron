import { ipcMain } from 'electron';
import axios from '../axios.js';
import {
  GET_ABNORMALITY_FILTER_OPTIONS,
  GET_FILTER_OPTIONS,
  GET_IMAGES,
  GET_PATIENT_IDS,
} from '../constants/endpoints.js';
import { CHANNELS } from '../constants/common';

export default function handleMessages(): void {
  ipcMain.handle(CHANNELS.FILTER_OPTIONS, async () => {
    try {
      const response = await axios.get(GET_FILTER_OPTIONS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.ABNORMALITY_FILTER_OPTIONS, async () => {
    try {
      const response = await axios.get(GET_ABNORMALITY_FILTER_OPTIONS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENT_IDS, async () => {
    try {
      const response = await axios.get(GET_PATIENT_IDS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENT_IMAGES, async (event: Electron.IpcMainInvokeEvent, patientId: string) => {
    try {
      const response = await axios.get(GET_IMAGES(patientId));
      return response;
    } catch (error) {
      throw new Error(error);
    }
  });
}

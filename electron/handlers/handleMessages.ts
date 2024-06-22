import { ipcMain } from 'electron';
import axios from '../axios.js';
import {
  GET_ABNORMALITY_FILTER_OPTIONS,
  GET_FILTER_OPTIONS,
  GET_IMAGES_DETAILS,
  GET_IMAGE,
  GET_PATIENT_IDS,
  GET_PATIENTS,
  GET_PATIENT_DETAILS,
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

  ipcMain.handle(CHANNELS.PATIENTS, async () => {
    try {
      const response = await axios.get(GET_PATIENTS, { timeout: 10000 });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENT_DETAILS, async (event: Electron.IpcMainInvokeEvent, patientId: string) => {
    try {
      const response = await axios.get(GET_PATIENT_DETAILS(patientId));
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

  ipcMain.handle(CHANNELS.PATIENT_IMAGES_DETAILS, async (event: Electron.IpcMainInvokeEvent, patientId: string) => {
    try {
      const response = await axios.get(GET_IMAGES_DETAILS(patientId), { timeout: 60000, params: { format: 'full' } });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENT_IMAGE, async (event: Electron.IpcMainInvokeEvent, data) => {
    try {
      const { seriesUID, SOPUID } = data;
      const response = await axios.get(GET_IMAGE, {
        responseType: 'arraybuffer',
        timeout: 60000,
        params: { series_UID: seriesUID, sop_uid: SOPUID },
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });
}

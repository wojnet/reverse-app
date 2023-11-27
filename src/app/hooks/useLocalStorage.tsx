import { useState } from "react";

interface ILocalStorageObject {
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => void;
}

export const useLocalStorage = (): ILocalStorageObject => {
  return {
    getItem: (key: string) => {
      try {
        const value = window.localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : null;
      } catch (error) {
        return error;
      }
    },
    setItem: (key: string, value: any) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        return error;
      }
    }
  } 
};
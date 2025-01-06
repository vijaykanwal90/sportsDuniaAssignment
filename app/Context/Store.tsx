// 'use client'
// import {createContext , ReactNode , useContext, Dispatch, SetStateAction , useState} from "react"

// type DataType = {
//     index:number;
//     title:string;
//     name:string;
//     image:string;
//     url:string;
//     date:string;

// }
// interface ContextProps {
//     data: DataType[];
//     setData: Dispatch<SetStateAction<DataType[]>>;
//     originalData: DataType[]; // Store original data
//     setOriginalData: Dispatch<SetStateAction<DataType[]>>;
//   }
  
//   // Create a context with default values
//   const ApiDataContext = createContext<ContextProps>({
//     data: [], // default empty data
//     setData: () => {},
//     originalData: [], // original data (no changes)
//     setOriginalData: () => {},
//      // a no-op function for the default setter
//   });

// export const ApiDataContextProvider = ({ children }: { children: ReactNode }) =>{
    
//     const [data,setData] = useState<[] | DataType[]>([]);
//     const [originalData, setOriginalData] = useState<DataType[]>([]);
//     return (
//         <ApiDataContext.Provider value={{data,setData , originalData,setOriginalData}}>
//             {children}
//         </ApiDataContext.Provider>
//     )
// }
// export const useApiDataContext = () => useContext(ApiDataContext)


// 'use client';

// import { createContext, ReactNode, useContext, Dispatch, SetStateAction, useState } from "react";

// // Define the structure of your data
// type DataType = {
//   index: number;
//   title: string;
//   name: string;
//   image: string;
//   url: string;
//   date: string;
// };

// // Define the structure of your context
// interface ContextProps {
//   data: DataType[]; // Holds the current filtered data
//   setData: Dispatch<SetStateAction<DataType[]>>; // Function to update the filtered data
//   originalData: DataType[]; // Stores the unfiltered/original data
//   setOriginalData: Dispatch<SetStateAction<DataType[]>>; // Function to update the original data
// }

// // Create the ApiDataContext with default values (no-op functions for the setters)
// const ApiDataContext = createContext<ContextProps>({
//   data: [], // Default to empty array
//   setData: () => {}, // Default no-op function
//   originalData: [], // Default to empty array
//   setOriginalData: () => {}, // Default no-op function
// });

// // Create a provider component to wrap your application and provide the context
// export const ApiDataContextProvider = ({ children }: { children: ReactNode }) => {
//   const [data, setData] = useState<DataType[]>([]); // State to hold the filtered data
//   const [originalData, setOriginalData] = useState<DataType[]>([]); // State to hold the original data

//   return (
//     <ApiDataContext.Provider value={{ data, setData, originalData, setOriginalData }}>
//       {children}
//     </ApiDataContext.Provider>
//   );
// };

// // Custom hook to use the ApiDataContext
// export const useApiDataContext = () => useContext(ApiDataContext);
'use client';

import { createContext, ReactNode, useContext, Dispatch, SetStateAction, useState } from "react";

// Existing DataType
export type DataType = {
  // index: number;
  // title: string;
  // name: string;
  // image: string;
  // url: string;
  // date: string;
  id: string;
  urlToImage: string;
  title: string;
  description: string;
  author: string;
  index: number;
  publishedAt: string;
  url: string;
};

// New Article type
export interface Article {
  id: string;
  urlToImage: string;
  title: string;
  description: string;
  author: string;
  index: number;
  publishedAt: string;
  url: string;
}

// Union type for items that can be either DataType or Article
export type DataItem = DataType | Article;

// Define the structure of your context
interface ContextProps {
  data: DataItem[];
  setData: Dispatch<SetStateAction<DataItem[]>>;
  originalData: DataItem[];
  setOriginalData: Dispatch<SetStateAction<DataItem[]>>;
}

// Create the ApiDataContext with default values
const ApiDataContext = createContext<ContextProps>({
  data: [],
  setData: () => {},
  originalData: [],
  setOriginalData: () => {},
});

// Create a provider component
export const ApiDataContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [originalData, setOriginalData] = useState<DataItem[]>([]);

  return (
    <ApiDataContext.Provider value={{ data, setData, originalData, setOriginalData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

// Custom hook to use the ApiDataContext
export const useApiDataContext = () => useContext(ApiDataContext);

